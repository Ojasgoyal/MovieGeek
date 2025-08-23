import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Follower() {
  const axios = useAxios();
  const { username } = useParams();
  const [follower, setfollower] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFollowersRoute = window.location.pathname.includes("followers");
  const endpoint = isFollowersRoute
    ? `/user/${username}/followers`
    : `/user/${username}/following`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(endpoint);
        setfollower(data[isFollowersRoute ? "followers" : "following"]);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, isFollowersRoute]);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4 flex gap-4">
          <Link
            to={`/${username}/followers`}
            className={`${isFollowersRoute ? "font-bold" : "text-gray-600"}`}
          >
            Followers
          </Link>
          <span className="w-px h-10 bg-gray-300"></span>
          <Link
            to={`/${username}/following`}
            className={`${!isFollowersRoute ? " font-bold" : "text-gray-600"} `}
          >
            Following
          </Link>
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : follower.length > 0 ? (
          <div className="space-y-4">
            {follower.map((user) => (
              <Link
                to={`/${user.username}`}
                key={user.username}
                className="block hover:bg-gray-100"
              >
                <div
                  key={user.username}
                  className="flex items-center gap-4 p-3 border rounded-md shadow-sm"
                >
                  <img
                    src={user.avatar?.url || "/default-avatar.png"}
                    alt={user.name || user.username}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {user.name || user.username}
                    </h2>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                    <p className="text-sm text-gray-900">
                      {user.bio || "No bio available"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No {isFollowersRoute ? "followers" : "following"} found.
          </div>
        )}
      </div>
    </>
  );
}
