import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";

export default function Bio({ isSelf, data, stats, onProfileUpdate }) {
  const axios = useAxios();
  const BASE_URL = "http://localhost:5000/api";
  const { user: loggedInUser } = useAuth();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Sync local state when new data comes in
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setBio(data.bio || "");
      setAvatarUrl(data.avatar?.url || null);
    }
  }, [data]);

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

  // ---- Update Avatar ----
  const handleAvatarUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsUploading(true);
      const { data: updatedUser } = await axios.put("/user/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatarUrl(updatedUser.avatar.url);

      if (onProfileUpdate) onProfileUpdate(updatedUser);
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!data || !stats) return null;

  return (
    <div className="md:max-w-5xl bg-white shadow-md rounded-sm p-6 md:p-8 mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
      {/* Avatar Section */}
      <div className="flex flex-row md:items-center gap-6 md:gap-10 w-full">
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full ring-1 ring-gray-200 overflow-hidden flex items-center justify-center bg-gray-100">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-700 text-3xl font-semibold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          {isSelf && (
            <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
              <RiImageEditLine size={14} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpdate}
                disabled={isUploading}
              />
            </label>
          )}
        </div>

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
              <p className="text-gray-700">{data.username}</p>
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

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
        {/* Follow Stats */}
        <div className="flex flex-row md:flex-col justify-around text-center md:pr-8 md:border-r md:border-gray-200">
          <div className="px-3 py-2">
            <p className="text-md text-sky-600">{stats.followersCount}</p>
            <p className="text-xs text-gray-600">Followers</p>
          </div>
          <div className="px-3 py-2">
            <p className="text-md text-sky-600">{stats.followingCount}</p>
            <p className="text-xs text-gray-600">Following</p>
          </div>
        </div>

        {/* Movie Stats */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-baseline justify-between w-[50%] md:w-40">
            <p className="text-sm text-gray-600">Watched</p>
            <p className="text-md text-sky-600">{stats.watchedCount}</p>
          </div>
          <div className="flex items-baseline justify-between w-[50%] md:w-40">
            <p className="text-sm text-gray-600">Watchlist</p>
            <p className="text-md text-sky-600">{stats.watchlistCount}</p>
          </div>
          <div className="flex items-baseline justify-between w-[50%] md:w-40">
            <p className="text-sm text-gray-600">Favorites</p>
            <p className="text-md text-sky-600">{stats.favoritesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
