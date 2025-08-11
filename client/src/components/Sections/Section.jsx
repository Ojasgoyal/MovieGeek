import MovieCard from "../Cards/MovieCard"

function Section({movieData,type}) {
  return (
      <div className="flex flex-wrap gap-2 justify-center max-w-6xl mx-auto px-2 md:gap-6">
        {movieData && Array.isArray(movieData.results) && movieData.results.map(movie => (
          <MovieCard type={type} key={movie.id} movie={movie}/>
        ))}
      </div>
  )
}

export default Section