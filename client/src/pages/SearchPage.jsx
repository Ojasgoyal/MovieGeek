import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ListSection from "../components/Sections/ListSection";
import SearchBar from "../components/SearchBar/SearchBar";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { type } = useParams();

  const query = searchParams.get("query") || "";
  const BASE_SEARCH_URL = "http://localhost:5000/api";

  const [activeTab, setActiveTab] = useState(type || "movie");
  const [results, setResults] = useState({
    multi: [],
    movie: [],
    tv: [],
    person: [],
  });
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Helper: fetch multiple categories at once
  const fetchTypes = async (typesArray) => {
    const requests = typesArray.map((t) =>
      axios.get(`${BASE_SEARCH_URL}/search/${t}?query=${query}`)
    );
    const responses = await Promise.all(requests);
    return typesArray.reduce((acc, t, i) => {
      acc[t] = responses[i].data || [];
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setShowContent(false);

    const loadData = async () => {
      try {
        if (type) {
          setActiveTab(type);
          const data = await fetchTypes(["movie", "tv", "person"]);
          setResults({ multi: [], ...data });
        } else {
          // Multi-search first
          const multiRes = await axios.get(
            `${BASE_SEARCH_URL}/search?query=${query}`
          );
          const multiData = multiRes.data || [];
          setResults((prev) => ({ ...prev, multi: multiData }));

          if (multiData.length > 0) {
            setActiveTab(multiData[0].media_type);
          }

          // Fetch movie, tv, person in parallel
          const data = await fetchTypes(["movie", "tv", "person"]);
          setResults((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
        setShowContent(true);
      }
    };

    loadData();
  }, [query, type, activeTab]);

  if (!query) {
    return (
      <div className="text-center mt-10 text-white">
        No search query provided.
      </div>
    );
  }

  return (
    <>
      <SearchBar />
      <div className="flex flex-col mt-2 justify-center items-center py-8 px-4">
        <h2 className="mt-2 text-lg md:text-xl tracking-tight capitalize">
          Search Results for:{" "}
          <span className="font-semibold">{query.replace(/\+/g, " ")}</span>
        </h2>

        {/* Tabs */}
        <div className="flex bg-white border border-black rounded-full p-1 w-fit shadow-sm my-5">
          {["movie", "tv", "person"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                navigate(`/search/${tab}?query=${encodeURIComponent(query)}`);
              }}
              className={`px-2 py-1 text-xs rounded-full transition-all w-14 ${
                activeTab === tab ? "bg-black text-white" : "text-black"
              }`}
            >
              {tab === "person" ? "PEOPLE" : tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={`mt-6 w-full fade-container ${showContent ? "visible" : ""}`}>
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : results[activeTab]?.length > 0 ? (
            <div className="section">
              <ListSection itemData={results[activeTab]} type={activeTab} />
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No {activeTab} results found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
