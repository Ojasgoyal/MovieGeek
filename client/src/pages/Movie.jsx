import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Play, Star } from "lucide-react";
import CreditCard from "../components/Cards/CreditCard.jsx";

export default function Movie() {
  const { type, param2: id } = useParams();
  const [movieData, setMovieData] = useState({
    data: null,
    credits: null,
    videos: null,
  });

  const BASE_URL = "http://localhost:5000/api/detail";

  async function getMovieDetails() {
    try {
      const { data } = await axios(`${BASE_URL}/${type}/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  async function getMovieVideos() {
    try {
      const { data } = await axios(`${BASE_URL}/${type}/${id}/videos`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  async function getMovieCredits() {
    try {
      const { data } = await axios(`${BASE_URL}/${type}/${id}/credits`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  useEffect(() => {
    const getDetails = async () => {
      try {
        const [data, credits, videos] = await Promise.all([
          getMovieDetails(),
          getMovieCredits(),
          getMovieVideos(),
        ]);

        setMovieData({ data, credits, videos });
      } catch (error) {
        console.error("cannot fetch movie details");
      }
    };
    getDetails();
  }, [type, id]);

  const [showTrailer, setShowTrailer] = useState(false);

  const trailer = movieData.videos?.results?.find(
    (vid) =>
      (vid.type === "Trailer" &&
        vid.site === "YouTube" &&
        vid.name.toLowerCase().includes("trailer")) ||
      vid.name.toLowerCase().includes("teaser")
  );

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateLong = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const { data: movie, credits, videos } = movieData;
  return (
    <>
      {movieData && movieData.data && (
        <div className="min-h-screen bg-gray-50">
          {/* Backdrop Header */}
          <div className="relative h-[70vh] w-full overflow-hidden">
            {!showTrailer ? (
              <div className="relative w-full h-full">
                {movie.backdrop_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50  to-transparent"></div>

                {/* Movie Title and Play Button */}
                <div className="absolute bottom-8 left-4 sm:left-8 max-w-4xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900">
                    {movie.title || movie.name}
                  </h1>
                  {trailer && (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 shadow-lg"
                    >
                      <Play size={24} fill="white" stroke="none" />
                      Watch Trailer
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full bg-white">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                  title={trailer.name}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowTrailer(false)}
                  className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-md text-2xl"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Movie Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Poster */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="w-64 md:w-80 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight"></h1>
                    {movie.tagline && (
                      <p className="text-gray-500 italic text-lg mb-4">
                        "{movie.tagline}"
                      </p>
                    )}
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-6 text-gray-600 text-sm md:text-base">
                      {(movie.release_date || movie.first_air_date) && (
                        <span className="font-medium">
                          {formatDateLong(
                            movie.release_date || movie.first_air_date
                          )}
                        </span>
                      )}
                      {movie.genres && movie.genres.length > 0 && (
                        <>
                          <span className="text-gray-400">•</span>
                          <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                              <span
                                key={genre.id}
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                      {movie.runtime && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>{formatRuntime(movie.runtime)}</span>
                        </>
                      )}
                    </div>
                    {movie.overview && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Synopsis
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {movie.overview}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Credits Sidebar */}
              {(credits?.cast?.length > 0 || credits?.crew?.length > 0) && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Cast & Crew
                    </h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {credits?.cast?.slice(0, 6).map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          {member.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                              {member.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.character || "Actor"}
                            </p>
                          </div>
                        </div>
                      ))}
                      {credits?.crew?.slice(0, 4).map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          {member.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                              {member.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.job}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            .overflow-y-auto::-webkit-scrollbar {
              width: 6px;
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 3px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
