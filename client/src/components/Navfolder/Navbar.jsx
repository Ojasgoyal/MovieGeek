import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import NavbarLinks from "./NavLinks";
import MobileDrawer from "./MobileDrawer";
import AccountLinks from "./AccountLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // account menu
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile sidebar
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  let ishome = true;

  if (location.pathname !== "/") {
    ishome = false;
  } else {
    ishome = true;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`sticky font-semibold top-0 z-40 w-full transition-colors duration-300 ${
          scrolled || !ishome
            ? "bg-sky-600/70 text-white backdrop-blur shadow-md"
            : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <nav
            aria-label="Primary"
            className="flex items-center h-10 md:h-10 drop-shadow"
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
                className="text-lg font-bold tracking-tight"
              >
                MovieGeek
              </Link>
            </div>

            {/* Desktop dropdowns */}
            <NavbarLinks />

            {/* Mobile account menu */}
            <div className="flex md:hidden flex-1 items-center justify-end order-3 relative">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2"
                aria-label="Account menu"
              >
                <FaRegUserCircle />
              </button>

              {isOpen && (
                <AccountLinks mobile onClose={() => setIsOpen(false)} />
              )}
            </div>

            {/* Desktop account links */}
            <AccountLinks />
          </nav>
        </div>
      </header>
      {/* Mobile drawer */}
      <MobileDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}
