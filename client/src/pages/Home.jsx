import axios from "axios";
import ListSection from "../components/Sections/ListSection";
import { useEffect, useState } from "react";
import ToggleButtons from "../components/ToggleButtons";
import SearchBar from "../components/SearchBar/SearchBar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [movieTime, setMovieTime] = useState(false);
  const [tvTime, setTvTime] = useState(false);
  const { user, login } = useAuth();
  const [randomPosterUrl, setRandomPosterUrl] = useState("");

  const [animating, setAnimating] = useState(false);
  const [animatingTv, setAnimatingTv] = useState(false);

  const toggleMovie = (isWeek) => {
    setAnimating(true);
    setTimeout(() => {
      setMovieTime(isWeek);
      setAnimating(false);
    }, 200);
  };

  const toggleTv = (isWeek) => {
    setAnimatingTv(true);
    setTimeout(() => {
      setTvTime(isWeek);
      setAnimatingTv(false);
    }, 200);
  };

  const getTrending = async (type, time = "") => {
    try {
      let url = "";
      if (time.trim() === "week") {
        url = `http://localhost:5000/api/trending/${type}/${time}`;
      } else {
        url = `http://localhost:5000/api/trending/${type}`;
      }

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const [movieData, setMovieData] = useState({
    movieDay: null,
    movieWeek: null,
    tvDay: null,
    tvWeek: null,
  });

  useEffect(() => {
    const fetchAllTrending = async () => {
      try {
        const [movieDay, movieWeek, tvDay, tvWeek] = await Promise.all([
          getTrending("movie"),
          getTrending("movie", "week"),
          getTrending("tv"),
          getTrending("tv", "week"),
        ]);

        setMovieData({ movieDay, movieWeek, tvDay, tvWeek });

        const combinedResults = [
          ...(movieDay?.results || []),
          ...(tvDay?.results || []),
        ];

        const validItems = combinedResults.filter((item) => item.backdrop_path);

        if (validItems.length) {
          const randomItem =
            validItems[Math.floor(Math.random() * validItems.length)];
          setRandomPosterUrl(
            `https://image.tmdb.org/t/p/original${randomItem.backdrop_path}`
          );
        }
      } catch (err) {
        console.error("Error fetching all data:", err);
      }
    };

    fetchAllTrending();
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/refresh",
          {},
          { withCredentials: true }
        );
        login(data.accessToken); 
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    };

    if (user?.token) {
      refreshToken(); 
    }
  }, [user, login]);

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
      
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center w-full items-center h-[100vh] -mt-[40px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: `url(${randomPosterUrl})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/25"></div>
        <SearchBar ishome={true} />
      </section>

      {/* Trending Movies Section */}
      <section className="py-10 px-4" id="trending-movies">
        <h2 className="text-2xl font-bold mb-2 text-center">Trending Movies</h2>
        <div className="relative mb-4 max-w-5xl md:pl-20 mx-auto">
          <ToggleButtons active={movieTime} onChange={toggleMovie} />
        </div>
        <div
          className={`transition-all duration-200 ease-in-out ${
            animating ? "opacity-0" : "opacity-100 blur-0"
          }`}
        >
          <ListSection
            type={"movie"}
            itemData={
              !movieTime
                ? movieData.movieDay?.results
                : movieData.movieWeek?.results
            }
          />
        </div>
      </section>
      <section className="py-10 px-4" id="trending-shows">
        <h2 className="text-2xl font-bold mb-4 text-center">Trending Shows</h2>
        <div className="relative mb-4 max-w-5xl md:pl-20 mx-auto">
          <ToggleButtons active={tvTime} onChange={toggleTv} />
        </div>
        <div
          className={`transition-all duration-200 ease-in-out ${
            animatingTv ? "opacity-0" : "opacity-100 blur-0"
          }`}
        >
          <ListSection
            type={"tv"}
            itemData={
              !tvTime ? movieData.tvDay?.results : movieData.tvWeek?.results
            }
          />
        </div>
      </section>
    </main>
  );
}
