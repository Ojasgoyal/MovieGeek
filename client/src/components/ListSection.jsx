import MovieCard from "./MovieCard"
import PersonCard from "./PersonCard"

function ListSection({itemData,type}) {
  
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-6xl mx-auto px-2 md:gap-6">
      {itemData && Array.isArray(itemData) && itemData.map(item => (
        (type === "movie" || type === "tv") ? (
          <MovieCard type={type} key={item.id} movie={item} />
        ) : type === "person" ? (
          <PersonCard key={item.id} person={item} />
        ) : null
      ))}
    </div>
  )
}

export default ListSection