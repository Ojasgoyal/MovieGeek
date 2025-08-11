import Dropdown from "../Dropdown";

export default function NavbarLinks() {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center gap-6 order-2">
      <Dropdown
        label="Movies"
        items={[
          { to: "/movie/popular", label: "Popular" },
          { to: "/movie/now_playing", label: "Now Playing" },
          { to: "/movie/upcoming", label: "Upcoming" },
          { to: "/movie/top_rated", label: "Top Rated" },
        ]}
        scrolled
      />
      <Dropdown
        label="TV Shows"
        items={[
          { to: "/tv/popular", label: "Popular" },
          { to: "/tv/airing_today", label: "Airing Today" },
          { to: "/tv/on_the_air", label: "On the Air" },
          { to: "/tv/top_rated", label: "Top Rated" },
        ]}
        scrolled
      />
      <Dropdown
        label="People"
        items={[{ to: "/person/popular", label: "Popular People" }]}
        scrolled
      />
    </div>
  );
}
