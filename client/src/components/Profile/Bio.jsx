import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Stats from "./Stats";
import Avatar from "./Avatar";
import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";

export default function Bio({
  isSelf,
  profileData,
  stats,
  onProfileUpdate,
  refreshStats,
}) {
  const axios = useAxios();
  const { user: loggedInUser } = useAuth();
  const { setMessage, setType } = useMessage();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isfollowing, setIsFollowing] = useState(false);
  const [loadingFollowStatus, setLoadingFollowStatus] = useState(true);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name || "");
      setBio(profileData.bio || "");
    }
  }, [profileData]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (!isSelf && profileData?.username) {
        setLoadingFollowStatus(true);
        try {
          const { data } = await axios.get(
            `/user/${profileData.username}/followers`
          );
          const isFollowingUser = data.followers.some(
            (follower) => follower.username === loggedInUser.username
          );
          setIsFollowing(isFollowingUser);
        } catch (error) {
          console.error("Error checking following status:", error);
        } finally {
          setLoadingFollowStatus(false); // End loading
        }
      }
    };
    checkFollowingStatus();
  }, [profileData, isSelf, loggedInUser]);

  const handleFollowToggle = async () => {
    try {
      const { data } = await axios.post(
        `/user/${profileData.username}/togglefollow`
      );
      setIsFollowing((prev) => !prev);

      if (refreshStats) refreshStats();

      setMessage(data.message);
      setType("success");
    } catch (error) {
      console.error("Error toggling follow:", error);
      setMessage("Failed to toggle follow status.");
      setType("error");
    }
  };

  // ---- Update Profile ----
  const handleProfileUpdate = async () => {
    try {
      const { data: updatedUser } = await axios.put("/user/edit", {
        name,
        bio,
      });

      setName(updatedUser.name);
      setBio(updatedUser.bio);
      setIsEditing(false);

      if (onProfileUpdate) onProfileUpdate(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarUpdate = (updatedUser) => {
    if (onProfileUpdate) onProfileUpdate(updatedUser);
  };

  if (!profileData || !stats) return null;

  return (
    <div className="border md:max-w-5xl bg-white shadow-md rounded-sm p-6 mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
      <div className="flex flex-row md:items-center gap-6 md:gap-10 w-full">
        <Avatar
          name={name}
          isSelf={isSelf}
          avatarUrl={profileData.avatar?.url}
          onAvatarUpdate={handleAvatarUpdate}
        />

        {/* User Info Section */}
        <div className="flex-1 relative">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleProfileUpdate}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded"
                >
                  <FaCheck /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-medium text-black">{name}</h1>
              <p className="text-gray-700">{profileData.username}</p>
              <p className="mt-3 text-black">{bio}</p>
              {isSelf && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-0 left-32 text-gray-500 hover:text-black"
                >
                  <FaEdit />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {!isSelf && !loadingFollowStatus && (
        <div className="mt-4">
          <button
            onClick={handleFollowToggle}
            className={`px-2 py-1 rounded ${
              isfollowing
                ? "bg-gray-300 text-black hover:bg-gray-400"
                : "bg-sky-500 text-white hover:bg-sky-600"
            }`}
          >
            {isfollowing ? "Following" : "Follow"}
          </button>
        </div>
      )}

      <Stats username={profileData.username} stats={stats} />
    </div>
  );
}
