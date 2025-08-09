import axios from "axios";
import Section from "../components/Section";
import { useEffect, useState } from "react";
import ToggleButtons from "../components/ToggleButtons";

export default function Home() {
  const [movieTime, setMovieTime] = useState(false);
  const [tvTime, setTvTime] = useState(false);

  const [randomPosterUrl, setRandomPosterUrl] = useState("");

  const toggleMovie = (isWeek) => setMovieTime(isWeek);
  const toggleTv = (isWeek) => setTvTime(isWeek);

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
        const [movieDay, movieWeek, tvDay, tvWeek, popularMovies] =
          await Promise.all([
            getTrending("movie"),
            getTrending("movie", "week"),
            getTrending("tv"),
            getTrending("tv", "week"),
            axios
              .get("http://localhost:5000/api/list/movie")
              .then((res) => res.data),
          ]);

        setMovieData({ movieDay, movieWeek, tvDay, tvWeek });

        // Pick a random hero from popular movies
        if (popularMovies?.length) {
          const validMovies = popularMovies.filter(
            (m) => m.backdrop_path
          );
          if (validMovies.length) {
            const randomMovie =
              validMovies[Math.floor(Math.random() * validMovies.length)];
            setRandomPosterUrl(
              `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
            );
          }
        }
      } catch (err) {
        console.error("Error fetching all data:", err);
      }
    };

    fetchAllTrending();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center w-full items-center h-[95vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${randomPosterUrl})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
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
          <ToggleButtons active={movieTime} onChange={toggleMovie} />
        </div>

        <Section
          movieData={!movieTime ? movieData.movieDay : movieData.movieWeek}
        />
      </section>
      <section className="py-12 px-4" id="trending-shows">
        <h2 className="text-2xl font-bold text-center">Trending Shows</h2>
        <div className="relative mb-6 max-w-6xl pl-5 mx-auto">
          <ToggleButtons active={tvTime} onChange={toggleTv} />
        </div>
        <Section movieData={!tvTime ? movieData.tvDay : movieData.tvWeek} />
      </section>
    </main>
  );
}
