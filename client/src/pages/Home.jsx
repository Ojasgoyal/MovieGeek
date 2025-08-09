import axios from "axios";
import Section from "../components/Section";
import { useEffect, useState } from "react";

export default function Home() {
  const [movieTime, setMovieTime] = useState(false);
  const [tvTime, setTvTime] = useState(false);

  const [randomPosterUrl, setRandomPosterUrl] = useState("");

  function toggleMovie(isWeek) {
    setMovieTime(isWeek);
  }
  function toggleTv(isWeek) {
    setTvTime(isWeek);
  }

  async function getTrending(type, time = "") {
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
  }

  const [movieData, setMovieData] = useState({
    movieDay: null,
    movieWeek: null,
    tvDay: null,
    tvWeek: null,
  });

  useEffect(() => {
    async function fetchAllTrending() {
      const [movieDay, movieWeek, tvDay, tvWeek] = await Promise.all([
        getTrending("movie"),
        getTrending("movie", "week"),
        getTrending("tv"),
        getTrending("tv", "week"),
      ]);
      setMovieData({ movieDay, movieWeek, tvDay, tvWeek });
    }
    fetchAllTrending();
  }, []);

  useEffect(() => {
    if (!movieData.movieWeek || !movieData.movieWeek.results) return;
    async function fetchRandomPoster() {
      try {
        const validMovies = movieData.movieWeek.results.filter(
          (m) => m.backdrop_path
        );
        const randomMovie =
          validMovies[Math.floor(Math.random() * validMovies.length)];
        setRandomPosterUrl(
          `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
        );
      } catch (err) {
        console.error("Error fetching poster:", err);
      }
    }

    fetchRandomPoster();
  }, [movieData.movieWeek]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center w-full items-center h-[100vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${randomPosterUrl})`,
          }}
        ></div>

        <form
          className="relative w-full max-w-4xl z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            autoFocus
            placeholder="Search for a movie , tv show , person..."
            className="w-full px-4 py-2 border border-white/40 rounded-3xl 
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 bg-white/20 backdrop-blur-md text-white placeholder-white/80"
          />
        </form>
      </section>

      {/* Trending Movies Section */}
      <section className="py-12 px-4" id="trending-movies">
        <h2 className="text-2xl font-bold text-center">Trending Movies</h2>
        <div className="relative mb-6 max-w-6xl pl-5 mx-auto">
          <div className="flex bg-white border border-black rounded-full p-1 w-fit shadow-sm">
            <button
              onClick={() => toggleMovie(false)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                !movieTime ? "bg-black text-white" : "text-black"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => toggleMovie(true)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                movieTime ? "bg-black text-white" : "text-black"
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        <Section
          movieData={!movieTime ? movieData.movieDay : movieData.movieWeek}
        />
      </section>
      <section className="py-12 px-4" id="trending-shows">
        <h2 className="text-2xl font-bold text-center">Trending Shows</h2>
        <div className="relative mb-6 max-w-6xl pl-5 mx-auto">
          <div className="flex bg-white border border-black rounded-full p-1 w-fit shadow-sm">
            <button
              onClick={() => toggleTv(false)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                !tvTime ? "bg-black text-white" : "text-black"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => toggleTv(true)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                tvTime ? "bg-black text-white" : "text-black"
              }`}
            >
              This Week
            </button>
          </div>
        </div>
        <Section movieData={!tvTime ? movieData.tvDay : movieData.tvWeek} />
      </section>
    </main>
  );
}
