import { Link } from "react-router-dom";


function PersonCard({person}) {

  return (
    <div className="person-card relative group">
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-5 pointer-events-none"></div>
      <div className="person-poster ">
        <Link to={`/person/${person.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            className="w-[80px] h-[120px] sm:w-[160px] sm:h-[240px] object-cover rounded-md"
          />
        </Link>
      </div>
    </div>
  );
}

export default PersonCard;
