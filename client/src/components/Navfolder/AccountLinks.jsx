import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";

export default function AccountLinks({ mobile = false, onClose }) {
  const { setMessage } = useMessage();
  const BASE_URL = "http://localhost:5000/api";
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      logout();
      setMessage("👋 Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
      if (onClose) onClose();
    }
  };

  // Mobile version
  if (mobile) {
    return (
      <div className="absolute right-0 top-10 w-28 bg-white text-black rounded shadow-md z-50 px-1 py-1 text-center">
        {user ? (
          <>
            <Link
              to="/profile"
              className="block w-full px-2 py-1 rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="block w-full text-center px-2 py-1 rounded hover:bg-gray-100"
            >
              {loading ? "..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="block w-full px-2 py-1 rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="block w-full px-2 py-1 rounded hover:bg-gray-100"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="hidden md:flex flex-1 items-center text-sm font-medium justify-end gap-3 order-3">
      {user ? (
        <>
          <Link to="/profile" className="px-2 py-1">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-2 py-1 hover:bg-sky-500/30 rounded transition"
          >
            {loading ? "..." : "Logout"}
          </button>
        </>
      ) : (
        <>
          <Link to="/signup" className="px-2 py-1">
            Sign Up
          </Link>
          <Link to="/login" className="px-2 py-1">
            Log In
          </Link>
        </>
      )}
    </div>
  );
}
