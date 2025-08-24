import {
  FaBookmark,
  FaRegBookmark,
  FaEye,
  FaRegEye,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { useState, useEffect } from "react";

function ListButtons({ onProfile = false, type, id, initialState = {} }) {

  const profileClass = onProfile
    ? "flex justify-around items-center bg-white shadow-md rounded-md p-1 md:w-full"
    : "hidden sm:flex gap-1 bg-white/50 rounded-full p-1 overlay absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity";

  const buttonClass = onProfile
    ? "flex flex-col items-center gap-1 p-3 rounded-full text-xl font-medium transition-all hover:bg-gray-200"
    : "favorites-btn bg-white/75 p-1.5 rounded-full hover:bg-white";

  return (
    <>
      <div className={`${profileClass}`}>
        <button
          className={`${buttonClass}`}
          onClick={() => setIsWatched((prev) => !prev)}
        >
          {initialState.watched ? (
            <FaEye className="text-sky-600" />
          ) : (
            <FaRegEye className="text-sky-500" />
          )}
        </button>
        <button
          className={`${buttonClass}`}
          onClick={() => setIsWatchlisted((prev) => !prev)}
        >
          {initialState.watchlist ? (
            <FaBookmark className="text-slate-600" />
          ) : (
            <FaRegBookmark className="text-slate-600" />
          )}
        </button>
        <button
          className={`${buttonClass}`}
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          {initialState.favorites ? (
            <FaHeart className="text-rose-500" />
          ) : (
            <FaRegHeart className="text-rose-500" />
          )}
        </button>
      </div>
    </>
  );
}

export default ListButtons;
