import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ ishome = false }) {
  const [isFixed, setIsFixed] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        // change 200 to whatever point you want
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
    const encoded = encodeURIComponent(query.trim()).replace(/%20/g, "+");
      navigate(`/search?query=${encoded}`);
    }
  };

  return (
    <form
      id="search-form"
      className={`z-10 transition-all duration-300 ${
        isFixed || !ishome
          ? "fixed top-[40px] left-0 w-full md:top-[40px] md:w-full md:max-w-none"
          : "relative w-full max-w-3xl px-4 md:px-0"
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie , tv show , person..."
        className={`w-full px-4 py-2 text-sm border border-white/40 focus:outline-none 
                   text-white backdrop-blur-sm  placeholder-white/80 
                 ${
                   isFixed || !ishome
                     ? "rounded-sm bg-gray-800/50"
                     : "rounded-full backdrop-blur-md bg-white/20"
                 }
                 `}
      />
    </form>
  );
}
