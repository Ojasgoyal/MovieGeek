import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown"; // import reusable dropdown

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // account menu
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile sidebar
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-sky-600/60 backdrop-blur shadow-md text-white"
          : "bg-transparent text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          aria-label="Primary"
          className="flex items-center h-12 md:h-14 drop-shadow"
        >
          {/* Mobile menu button */}
          <div className="flex md:hidden flex-1 items-center justify-start order-1">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              ☰
            </button>
          </div>

          {/* Brand */}
          <div className="flex flex-1 items-center justify-center md:justify-start order-2 md:order-1">
            <Link
              to="/"
              aria-label="Go to home"
              className="text-lg font-semibold tracking-tight"
            >
              MovieGeek
            </Link>
          </div>

          {/* Desktop dropdowns */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 order-2">
            <Dropdown
              label="Movies"
              items={[
                { to: "/movies/popular", label: "Popular" },
                { to: "/movies/now-playing", label: "Now Playing" },
                { to: "/movies/upcoming", label: "Upcoming" },
                { to: "/movies/top-rated", label: "Top Rated" },
              ]}
              scrolled
            />
            <Dropdown
              label="TV Shows"
              items={[
                { to: "/tv/popular", label: "Popular" },
                { to: "/tv/airing-today", label: "Airing Today" },
                { to: "/tv/on-the-air", label: "On the Air" },
                { to: "/movies/top-rated", label: "Top Rated" },
              ]}
              scrolled
            />
            <Dropdown
              label="People"
              items={[{ to: "/people/popular", label: "Popular People" }]}
              scrolled
            />
          </div>

          {/* Mobile account menu */}
          <div className="flex md:hidden flex-1 items-center justify-end order-3 relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2"
              aria-label="Account menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 top-10 w-32 bg-white text-black rounded shadow-md z-50 px-2 py-2 text-center">
                <Link
                  to="/signup"
                  className="block w-full px-3 py-2 rounded hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 rounded hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
              </div>
            )}
          </div>

          {/* Desktop account links */}
          <div className="hidden md:flex flex-1 items-center text-sm font-medium justify-end gap-3 order-3">
            <Link to="/signup" className="px-3 py-2">
              Sign Up
            </Link>
            <Link to="/login" className="px-3 py-2">
              Log In
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside
        aria-hidden={!drawerOpen}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Movies</h3>
            <Link to="/movies/popular" className="block px-2 py-1">
              Popular
            </Link>
            <Link to="/movies/now-playing" className="block px-2 py-1">
              Now Playing
            </Link>
            <Link to="/movies/upcoming" className="block px-2 py-1">
              Upcoming
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">TV Shows</h3>
            <Link to="/tv/popular" className="block px-2 py-1">
              Popular
            </Link>
            <Link to="/tv/airing-today" className="block px-2 py-1">
              Airing Today
            </Link>
            <Link to="/tv/on-the-air" className="block px-2 py-1">
              On the Air
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">People</h3>
            <Link to="/people/popular" className="block px-2 py-1">
              Popular People
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
