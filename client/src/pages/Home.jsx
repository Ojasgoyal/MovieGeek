import axios from "axios";
import Section from "../components/Section";
import { useEffect, useState } from "react";
import ToggleButtons from "../components/ToggleButtons";

export default function Home() {
  const [movieTime, setMovieTime] = useState(false);
  const [tvTime, setTvTime] = useState(false);

  const [randomPosterUrl, setRandomPosterUrl] = useState("");

  const [animating, setAnimating] = useState(false);
  const [animatingTv, setAnimatingTv] = useState(false);

  const toggleMovie = (isWeek) => {
    setAnimating(true);
    setTimeout(() => {
      setMovieTime(isWeek);
      setAnimating(false);
    }, 200); // match transition duration
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
        const [movieDay, movieWeek, tvDay, tvWeek, popularMovies] =
          await Promise.all([
            getTrending("movie"),
            getTrending("movie", "week"),
            getTrending("tv"),
            getTrending("tv", "week"),
            axios
              .get("http://localhost:5000/api/list/movie/now_playing")
              .then((res) => res.data),
          ]);

        setMovieData({ movieDay, movieWeek, tvDay, tvWeek });

        // Pick a random hero from popular movies
        if (popularMovies?.length) {
          const validMovies = popularMovies.filter((m) => m.backdrop_path);
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

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        // change 200 to whatever point you want
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
      <section className="relative flex flex-col justify-center w-full items-center h-[101vh] -mt-[56px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: `url(${randomPosterUrl})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <form
          id="search-form"
          className={`z-10 transition-all duration-300 ${
            isFixed
              ? "fixed top-[48px] left-0 w-full md:top-[56px] md:w-full md:max-w-none"
              : "relative w-full max-w-4xl px-4 md:px-0"
          }`}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            autoFocus
            placeholder="Search for a movie , tv show , person..."
            className={`w-full px-4 py-2 border border-white/40  
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-white backdrop-blur-sm  placeholder-white/80 
                 ${
                  isFixed
                  ? "rounded-sm bg-gray-800/50"
                  : "rounded-3xl backdrop-blur-md bg-white/20"
                 }
                 `}
          />
        </form>
      </section>

      {/* Trending Movies Section */}
      <section className="py-12 px-4" id="trending-movies">
        <h2 className="text-2xl font-bold mb-6 text-center">Trending Movies</h2>
        <div className="relative mb-4 max-w-6xl pl-5 mx-auto">
          <ToggleButtons active={movieTime} onChange={toggleMovie} />
        </div>
        <div
          className={`transition-all duration-200 ease-in-out ${
            animating ? "opacity-0" : "opacity-100 blur-0"
          }`}
        >
          <Section
            type={"movie"}
            movieData={!movieTime ? movieData.movieDay : movieData.movieWeek}
          />
        </div>
      </section>
      <section className="py-12 px-4" id="trending-shows">
        <h2 className="text-2xl font-bold mb-4 text-center">Trending Shows</h2>
        <div className="relative mb-4 max-w-6xl pl-5 mx-auto">
          <ToggleButtons active={tvTime} onChange={toggleTv} />
        </div>
        <div
          className={`transition-all duration-200 ease-in-out ${
            animatingTv ? "opacity-0" : "opacity-100 blur-0"
          }`}
        >
          <Section type={"tv"} movieData={!tvTime ? movieData.tvDay : movieData.tvWeek} />
        </div>
      </section>
    </main>
  );
}
