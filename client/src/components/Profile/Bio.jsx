import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Stats from "./Stats";
import Avatar from "./Avatar";

export default function Bio({ isSelf, data, stats, onProfileUpdate }) {
  const axios = useAxios();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setBio(data.bio || "");
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

  const handleAvatarUpdate = (updatedUser) => {
    if (onProfileUpdate) onProfileUpdate(updatedUser);
  };

  if (!data || !stats) return null;

  return (
    <div className="md:max-w-5xl bg-white shadow-md rounded-sm p-6 md:p-8 mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
      <div className="flex flex-row md:items-center gap-6 md:gap-10 w-full">
        <Avatar
          name={name}
          isSelf={isSelf}
          avatarUrl={data.avatar?.url}
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

      <Stats stats={stats} />
    </div>
  );
}
