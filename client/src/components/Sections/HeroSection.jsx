import { Play } from "lucide-react";

export default function HeroSection({
  details,
  trailer,
  showTrailer,
  setShowTrailer,
}) {
  return (
    <div className="relative w-full overflow-hidden">
      {!showTrailer ? (
        <div className="relative w-full h-[40vh] sm:h-[70vh]">
          {details.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              alt={details.title || details.name}
              className="w-full h-full object-cover opacity-60"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent"></div>

          {/* Movie Title and Play Button */}
          <div className="absolute bottom-8 left-4 sm:left-8 max-w-4xl">
            <h1 className="text-2xl sm:text-5xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
              {details.title || details.name}
            </h1>
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 bg-sky-600/80 hover:bg-sky-700/80 text-white font-md py-2 px-3 rounded-full transition-all duration-300 shadow-lg"
              >
                <Play size={24} fill="white" stroke="none" />
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-full mt-[37px] h-[40vh] sm:h-[70vh] lg:h-[75vh] xl:h-[80vh]">
          <div className="relative w-full h-full">
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
        </div>
      )}
    </div>
  );
}
