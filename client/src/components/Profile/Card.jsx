import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Card({ movie, type }) {
  function toggleFavorite() {
    console.log("Favorite toggled");
  }

  return (
    <div className="movie-card relative group">
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-5 pointer-events-none"></div>
      <div className="movie-poster">
        <Link to={`/${type}/${movie._id}`}>
          <img
            src={movie.posterUrl} // Use posterUrl from the backend
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

export default Card;