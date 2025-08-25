import { useState } from "react";
import { Link } from "react-router-dom";

export default function PersonDetails({ details, movie_credits, tv_credits }) {
  const [showFullBio, setShowFullBio] = useState(false);

  const formatDateLong = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const trimmedBiography =
    details.biography && details.biography.length > 300
      ? `${details.biography.slice(0, 300)}...`
      : details.biography;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {details.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
              alt={details.name}
              className="w-[150px] md:w-[240px] rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {details.name}
          </h1>
          {details.birthday && (
            <p className="text-gray-600 text-sm md:text-base mb-2">
              <strong>Born:</strong> {formatDateLong(details.birthday)}
            </p>
          )}
          {details.place_of_birth && (
            <p className="text-gray-600 text-sm md:text-base mb-4">
              <strong>Place of Birth:</strong> {details.place_of_birth}
            </p>
          )}
          {details.biography && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Biography
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {showFullBio ? details.biography : trimmedBiography}
              </p>
              {details.biography.length > 300 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-blue-600 hover:underline mt-2 text-sm font-medium"
                >
                  {showFullBio ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Movie Credits */}
      {movie_credits?.cast?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Movie Credits
          </h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {movie_credits.cast.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.credit_id}
                className="flex-shrink-0 w-36 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-48 rounded-sm object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    N/A
                  </div>
                )}
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {movie.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {movie.character || "Actor"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* TV Credits */}
      {tv_credits?.cast?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">TV Credits</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {tv_credits.cast.map((tv) => (
              <Link
                to={`/tv/${tv.id}`}
                key={tv.credit_id}
                className="flex-shrink-0 w-36 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                {tv.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${tv.poster_path}`}
                    alt={tv.name}
                    className="w-full h-48 rounded-sm object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    N/A
                  </div>
                )}
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {tv.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {tv.character || "Actor"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
