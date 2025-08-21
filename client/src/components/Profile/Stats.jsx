export default function Stats({ stats }) {
  return (
    <>
      {/* Stats Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
        {/* Follow Stats */}
        <div className="flex flex-row md:flex-col justify-around text-center md:pr-8 md:border-r md:border-gray-200">
          <div className="px-3 py-2">
            <p className="text-md text-sky-600">{stats.followersCount}</p>
            <p className="text-xs text-gray-600">Followers</p>
          </div>
          <div className="px-3 py-2">
            <p className="text-md text-sky-600">{stats.followingCount}</p>
            <p className="text-xs text-gray-600">Following</p>
          </div>
        </div>

        {/* Movie Stats */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-baseline justify-between w-[50%] md:w-40">
            <p className="text-sm text-gray-600">Watched</p>
            <p className="text-md text-sky-600">{stats.watchedCount}</p>
          </div>
          <div className="flex items-baseline justify-between w-[50%] md:w-40">
            <p className="text-sm text-gray-600">Watchlist</p>
            <p className="text-md text-sky-600">{stats.watchlistCount}</p>
          </div>
          <div className="flex items-baseline justify-between w-[50%] md:w-40">
            <p className="text-sm text-gray-600">Favorites</p>
            <p className="text-md text-sky-600">{stats.favoritesCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
