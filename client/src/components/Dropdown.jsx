import { Link } from "react-router-dom";

export default function Dropdown({ label, items }) {
  return (
    <div className="relative group">
      {/* Dropdown trigger */}
      <button
        type="button"
        className="px-3 py-2 text-sm font-medium tracking-tight transition-colors"
      >
        {label}
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute left-0 top-full w-48 bg-white text-black
          rounded-lg shadow-lg ring-1 ring-black ring-opacity-5
          transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible
          z-50
        `}
      >
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
