import { FaRegHeart } from "react-icons/fa";

function MovieCard({movie}) {
    
    function addToFavorite(){
        
    }
    return (
        <div className="movie-card">
            <div className="movie-poster ">   
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="h-[200px]"/>
            <div className="overlay">
                <button className="favorite-btn" onClick={addToFavorite}>
                    <FaRegHeart />
                </button>
            </div>
            </div>
        </div>
    )
}

export default MovieCard;