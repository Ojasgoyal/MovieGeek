import MovieCard from "./Moviecard"

function Section({movieData,type}) {
  return (
      <div className="flex flex-wrap gap-4 justify-center max-w-6xl mx-auto px-4 md:gap-6">
        {movieData && Array.isArray(movieData.results) && movieData.results.map(movie => (
          <MovieCard type={type} key={movie.id} movie={movie}/>
        ))}
      </div>
  )
}

export default Section