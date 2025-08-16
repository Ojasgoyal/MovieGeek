import { Link } from "react-router-dom";

export default function CreditCard({ person, role }) {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : "/placeholder-person.jpg";

  return (
    <Link
      to={`/person/${person.id}`}
      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
    >
      {/* Profile Image */}
      {person.profile_path ? (
        <img
          src={imageUrl}
          alt={person.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          {person.name.charAt(0)}
        </div>
      )}

      {/* Person Details */}
      <div>
        <p className="text-sm font-medium text-gray-900">{person.name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </Link>
  );
}
