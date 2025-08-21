import { useState } from "react";
import { RiImageEditLine } from "react-icons/ri";
import useAxios from "../../hooks/useAxios";

export default function Avatar({ name,isSelf, avatarUrl, onAvatarUpdate }) {
  const axios = useAxios();
  const [isUploading, setIsUploading] = useState(false);


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

      if (onAvatarUpdate) onAvatarUpdate(updatedUser);
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Avatar Section */}
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
              {(name || "N/A")
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
    </>
  );
}
