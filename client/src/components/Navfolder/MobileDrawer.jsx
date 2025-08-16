import { Link } from "react-router-dom";

export default function MobileDrawer({ drawerOpen, setDrawerOpen }) {
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside
        aria-hidden={!drawerOpen}
        className={`fixed top-0 left-0 h-full w-48 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Movies</h3>
            <Link to="/movie/popular" className="block px-2 py-1" onClick={closeDrawer}>
              Popular
            </Link>
            <Link to="/movie/now_playing" className="block px-2 py-1" onClick={closeDrawer}>
              Now Playing
            </Link>
            <Link to="/movie/upcoming" className="block px-2 py-1" onClick={closeDrawer}>
              Upcoming
            </Link>
            <Link to="/movie/top_rated" className="block px-2 py-1" onClick={closeDrawer}>
              Top Rated
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">TV Shows</h3>
            <Link to="/tv/popular" className="block px-2 py-1" onClick={closeDrawer}>
              Popular
            </Link>
            <Link to="/tv/airing_today" className="block px-2 py-1" onClick={closeDrawer}>
              Airing Today
            </Link>
            <Link to="/tv/on_the_air" className="block px-2 py-1" onClick={closeDrawer}>
              On the Air
            </Link>
            <Link to="/tv/top_rated" className="block px-2 py-1" onClick={closeDrawer}>
              Top Rated
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">People</h3>
            <Link to="/person/popular" className="block px-2 py-1" onClick={closeDrawer}>
              Popular People
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
