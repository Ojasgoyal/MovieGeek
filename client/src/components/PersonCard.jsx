import { Link } from "react-router-dom";


function PersonCard({person}) {

  return (
    <div className="person-card relative group">
      <div className="person-poster ">
        <Link to={`/person/${person.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            className="h-[120px] sm:h-[200px] object-cover"
          />
        </Link>
      </div>
    </div>
  );
}

export default PersonCard;
