import MovieCard from "./Moviecard"

function Section({title,movieData}) {
  return (
      <div className="flex flex-wrap justify-center gap-6">
        {movieData && Array.isArray(movieData.results) && movieData.results.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
  )
}

export default Section