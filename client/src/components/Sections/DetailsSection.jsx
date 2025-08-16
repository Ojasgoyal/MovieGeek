export default function DetailsSection({ details }) {
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

  return (
    <div className="lg:col-span-2">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {details.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title || details.name}
              className="w-[150px] md:w-[240px] rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight"></h1>
          {details.tagline && (
            <p className="text-gray-500 italic text-lg mb-4">
              "{details.tagline}"
            </p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-6 text-gray-600 text-sm md:text-base">
            {(details.release_date || details.first_air_date) && (
              <span className="font-medium">
                {formatDateLong(details.release_date || details.first_air_date)}
              </span>
            )}
            {details.genres && details.genres.length > 0 && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
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
            {details.runtime && (
              <>
                <span className="text-gray-400">•</span>
                <span>{formatRuntime(details.runtime)}</span>
              </>
            )}
          </div>
          {details.overview && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Synopsis
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {details.overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
