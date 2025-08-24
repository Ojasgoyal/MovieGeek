import { Link } from "react-router-dom";
import ListButtons from "../ListButtons";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Card({ movie, type }) {
  const { user } = useAuth();
  const [listState, setListState] = useState({
    watchlist: false,
    watched: false,
    favorites: false,
  });

  const [hovered, setHovered] = useState(false);

  const fetchListState = async () => {
    try {
      const statuses = ["watchlist", "watched", "favorites"];
      const state = { watchlist: false, watched: false, favorites: false };

      // Fetch each list and check if the movie exists
      await Promise.all(
        statuses.map(async (status) => {
          const { data } = await axios.get(
            `http://localhost:5000/api/user/${user.username}/list?status=${status}&type=${type}`
          );
          if (data.some((item) => Number(item.tmdbId) === Number(movie._id))) {
            state[status] = true;
          }
        })
      );

      setListState(state);
    } catch (error) {
      console.error("Failed to fetch list state:", error);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    fetchListState();
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="movie-card relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-5 pointer-events-none"></div>
      <div className="movie-poster">
        <Link to={`/${type}/${movie._id}`}>
          <img
            src={movie.posterUrl} // Use posterUrl from the backend
            alt={movie.title}
            className="w-[80px] h-[120px] sm:h-[240px] sm:w-[160px] object-cover rounded-md"
          />
        </Link>
        {hovered && (
          <ListButtons type={type} id={movie.id} initialState={listState} />
        )}
      </div>
    </div>
  );
}

export default Card;
