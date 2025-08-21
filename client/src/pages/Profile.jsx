import useAxios from "../hooks/useAxios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import ListSection from "../components/Sections/ListSection";
import Bio from "../components/Profile/Bio";

export default function Profile() {
  const axios = useAxios();
  const BASE_URL = "http://localhost:5000/api";
  const { username } = useParams();
  const { user: loggedInUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const isSelf = loggedInUser?.username === username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/${username}`);
        setProfileData(data.user);
        setStats(data.stats);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile");
      }
    };
    fetchProfile();
  }, [username]);

  return (
    <>
      <div className="w-full h-[97vh]">
        <Bio
          isSelf={isSelf}
          data={profileData}
          stats={stats}
          onProfileUpdate={setProfileData}
        />
      </div>
    </>
  );
}
