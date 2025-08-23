import axios from "axios";
import { useState, useEffect } from "react";
import Section from "./Section";

export default function Lists({ username }) {
  const BASE_URL = "http://localhost:5000/api";
  const [activeList, setActiveList] = useState("watched");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      setLoading(true);
      setShowContent(false)
      setError(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/user/${username}/list?status=${activeList}`
        );
        setListData(data);
      } catch (err) {
        setError("Failed to fetch list data");
        console.error(err);
      } finally {
        setLoading(false);
        setShowContent(true)
      }
    };
    fetchListData();
  }, [activeList, username]);

  return (
    <div className="w-full pt-2">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {/* Centered Toggle Buttons */}
          <div className="flex justify-center items-center bg-white border border-black rounded-full p-1 w-fit shadow-sm mx-auto">
            {["watched", "watchlist", "favorites"].map((list) => (
              <button
                key={list}
                onClick={() => setActiveList(list)}
                className={`px-1 py-1 text-sm rounded-full transition-all w-24 ${
                  activeList === list ? "bg-black text-white" : "text-black"
                }`}
              >
                {list.charAt(0).toUpperCase() + list.slice(1)}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div
            className={`w-full fade-container ${
              showContent ? "visible" : ""
            }`}
          >
          {listData.length ? (
            <Section itemData={listData} type="movie" />
          ) : (
            <div className="text-center text-gray-500">
              Nothing in {activeList}
            </div>
          )}
          </div>
        </>
      )}
    </div>
  );
}
