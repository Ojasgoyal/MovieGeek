import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function MovieCard({ movie, type }) {
  function toggleFavorite() {
    console.log("hello");
  }
  //   async function toggleFavorite() {
  //     const [isFavorite, setIsFavorite] = useState(false);
  //     try {
  //       const token = localStorage.getItem("accessToken");

  //       if (!token) {
  //         console.warn("User not logged in");
  //         return;
  //       }

  //       if (isFavorite) {
  //         await axios.delete(
  //           `http://localhost:5000/api/list/${type}/${movie.id}/remove`
  //         );
  //         setIsFavorite(false);
  //       } else {
  //         await axios.post(
  //           `http://localhost:5000/api/list/${type}/${movie.id}/add`
  //         );
  //         setIsFavorite(true);
  //       }
  //     } catch (error) {
  //       console.error("Error updating favorites:", error);
  //     }
  //   }

  return (
    <div className="movie-card relative group">
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-5 pointer-events-none"></div>
      <div className="movie-poster">
        <Link to={`/${type}/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[80px] h-[120px] sm:h-[240px] sm:w-[160px] object-cover rounded-md"
          />
        </Link>
        <div className="overlay absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="favorite-btn bg-white/50 p-1.5 rounded-full hover:bg-white"
            onClick={toggleFavorite}
          >
            <FaRegHeart className="text-rose-500 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
