import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import ListSection from "../components/Sections/ListSection";
import Bio from "../components/Profile/Bio";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Profile() {
  const { username } = useParams();
  const BASE_URL = "http://localhost:5000/api";
  const { user: loggedInUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null);

  const isSelf = loggedInUser?.username === username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/${username}`);
        setProfileData(data.user);
        setStats(data.stats);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile");
        console.log(err.response?.data?.message || "Error fetching profile");
      }
    };
    fetchProfile();
  }, [username]);

  return (
    <>
      <SearchBar />
      <div className="w-full mt-[40px]">
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Bio
            isSelf={isSelf}
            data={profileData}
            stats={stats}
            onProfileUpdate={setProfileData}
          />
        )}
      </div>
    </>
  );
}
