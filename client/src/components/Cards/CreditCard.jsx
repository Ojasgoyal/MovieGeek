export default function CreditCard({ person, character, job }) {
  const imageUrl = person.profile_path 
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : '/placeholder-person.jpg';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[150px]">
      <img 
        src={imageUrl} 
        alt={person.name}
        className="w-full h-48 object-cover bg-gray-100"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE1MCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzAiIHI9IjI1IiBmaWxsPSIjRDFENUQ5Ii8+CjxwYXRoIGQ9Ik0yNSAxNzVDMjUgMTUwIDQ3LjUgMTMwIDc1IDEzMFMxMjUgMTUwIDEyNSAxNzVWMjI1SDI1VjE3NVoiIGZpbGw9IiNEMUQ1RDkiLz4KPHN2Zz4K';
        }}
      />
      <div className="p-3">
        <h4 className="font-semibold text-sm text-gray-900 truncate">{person.name}</h4>
        {character && (
          <p className="text-xs text-gray-600 truncate mt-1">{character}</p>
        )}
        {job && (
          <p className="text-xs text-gray-600 truncate mt-1">{job}</p>
        )}
      </div>
    </div>
  );
};
