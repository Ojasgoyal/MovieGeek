import axios from "axios";
import { useState, useEffect, lazy, Suspense} from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Bio from "../components/Profile/Bio";
import SearchBar from "../components/SearchBar/SearchBar";
import { useMessage } from "../context/MessageContext";

const Lists = lazy(() => import("../components/Profile/Lists"));

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { setMessage, setType } = useMessage();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
        <Suspense
          fallback={
            <div className="fade-container visible py-6 text-center text-gray-500">
              Loading ...
            </div>
          }
        >
          <div className="fade-container visible">
            <Lists username={username} />
          </div>
        </Suspense>
      </div>
    </>
  );
}
