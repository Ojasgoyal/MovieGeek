import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Bio from "../components/Profile/Bio";
import SearchBar from "../components/SearchBar/SearchBar";
import Lists from "../components/Profile/Lists";
import { useMessage } from "../context/MessageContext";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { setMessage, setType } = useMessage();
  const BASE_URL = "http://localhost:5000/api";
  const { user: loggedInUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const isSelf = loggedInUser?.username === username;

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${username}`);
      setProfileData(data.user);
      setStats(data.stats);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching profile");
      setMessage("Error fetching profile: Username Doesn't Exist");
      setType("error");
      navigate("/404");
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${username}`);
      setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  return (
    <>
      <SearchBar />
      <div className="w-full mt-[38px]">
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Bio
            isSelf={isSelf}
            profileData={profileData}
            stats={stats}
            onProfileUpdate={setProfileData}
            refreshStats={fetchStats}
          />
        )}
        <Lists username={username} />
      </div>
    </>
  );
}
