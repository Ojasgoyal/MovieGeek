export default function SearchBar({isFixed}) {
  return (
    <form
      id="search-form"
      className={`z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-[48px] left-0 w-full md:top-[56px] md:w-full md:max-w-none"
          : "relative w-full max-w-4xl px-4 md:px-0"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        autoFocus
        placeholder="Search for a movie , tv show , person..."
        className={`w-full px-4 py-2 border border-white/40  
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-white backdrop-blur-sm  placeholder-white/80 
                 ${
                   isFixed
                     ? "rounded-sm bg-gray-800/50"
                     : "rounded-3xl backdrop-blur-md bg-white/20"
                 }
                 `}
      />
    </form>
  );
}
