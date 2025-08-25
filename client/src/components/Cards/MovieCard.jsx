import { Link } from "react-router-dom";
import ListButtons from "../ListButtons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function MovieCard({ movie, type }) {
  const { user } = useAuth();
  const [listState, setListState] = useState({
    watchlist: false,
    watched: false,
    favorites: false,
  });

  const [fetching, setFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const cardRef = useRef(null);

  const fetchListState = async () => {
    if (!user.accessToken || hasFetched || fetching) return;

    setFetching(true);
    try {
      const statuses = ["watchlist", "watched", "favorites"];
      const state = { watchlist: false, watched: false, favorites: false };

      // Fetch each list and check if the movie exists
      await Promise.all(
        statuses.map(async (status) => {
          const { data } = await axios.get(
            `http://localhost:5000/api/user/${user.username}/list?status=${status}&type=${type}`
          );
          if (
            data.some(
              (item) => Number(item.tmdbId) === Number(movie.id || movie._id)
            )
          ) {
            state[status] = true;
          }
        })
      );

      setListState(state);
      setHasFetched(true);
    } catch (error) {
      console.error("Failed to fetch list state:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!user?.accessToken) return;

    const handleMouseMove = (e) => {
      if (hasFetched || fetching) return; // Skip if already fetched

      const cardRect = cardRef.current.getBoundingClientRect(); // Get the card's bounding box
      const cursorX = e.clientX; // Cursor X position
      const cursorY = e.clientY; // Cursor Y position

      // Calculate the distance between the cursor and the card
      const distanceX = Math.max(
        cardRect.left - cursorX,
        cursorX - cardRect.right,
        0
      );
      const distanceY = Math.max(
        cardRect.top - cursorY,
        cursorY - cardRect.bottom,
        0
      );
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Trigger the API call if the cursor is within 100px of the card
      if (distance < 50) {
        fetchListState();
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [user, hasFetched , fetching]);

  return (
    <div ref={cardRef} className="movie-card relative group ">
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-5 pointer-events-none"></div>
      <div className="movie-poster">
        <Link to={`/${type}/${movie.id || movie._id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${
              movie.poster_path || movie.posterUrl
            }`}
            alt={movie.title}
            className="w-[80px] h-[120px] sm:h-[240px] sm:w-[160px] object-cover rounded-md"
          />
        </Link>
        {user?.username && (
          <ListButtons type={type} id={movie.id || movie._id} initialState={listState} />
        )}
      </div>
    </div>
  );
}

export default MovieCard;
