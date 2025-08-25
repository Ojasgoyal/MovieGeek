import {
  FaBookmark,
  FaRegBookmark,
  FaEye,
  FaRegEye,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

function ListButtons({
  onProfile = false,
  onDetails = false,
  type,
  id,
  initialState = {},
}) {
  const [listState, setListState] = useState(initialState);
  const axios = useAxios();

  useEffect(() => {
    if (
      initialState.watchlist !== listState.watchlist ||
      initialState.watched !== listState.watched ||
      initialState.favorites !== listState.favorites
    ) {
      setListState(initialState);
    }
  }, [initialState]);

  const handleToggle = async (status) => {
    const isInList = listState[status];
    try {
      if (isInList) {
        await axios.delete(`detail/${type}/${id}/remove`, {
          data: { status },
        });
      } else {
        await axios.post(`detail/${type}/${id}/add`, {
          status,
        });
      }

      setListState((prev) => ({
        ...prev,
        [status]: !isInList,
      }));
    } catch (error) {
      console.error(
        `Failed to ${isInList ? "remove from" : "add to"} ${status}:`,
        error
      );
    }
  };

  const detailClass = onDetails
    ? "flex justify-around items-center bg-white shadow-md rounded-md p-1 md:w-full"
    : "hidden sm:flex gap-1 bg-white/50 rounded-full p-1 overlay absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity";

  const profileClass = onProfile ? "p-1" : "p-1.5";
  const buttonClass = onDetails
    ? "flex flex-col items-center gap-1 p-3 rounded-full text-xl font-medium transition-all hover:bg-gray-200"
    : `favorites-btn bg-white/75 rounded-full hover:bg-white ${profileClass}`;

  return (
    <>
      <div className={`${detailClass}`}>
        <button
          className={`${buttonClass}`}
          onClick={() => handleToggle("watched")}
        >
          {listState?.watched ? (
            <FaEye className="text-sky-600" />
          ) : (
            <FaRegEye className="text-sky-500" />
          )}
        </button>
        <button
          className={`${buttonClass}`}
          onClick={() => handleToggle("watchlist")}
        >
          {listState?.watchlist ? (
            <FaBookmark className="text-slate-600" />
          ) : (
            <FaRegBookmark className="text-slate-600" />
          )}
        </button>
        <button
          className={`${buttonClass}`}
          onClick={() => handleToggle("favorites")}
        >
          {listState?.favorites ? (
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
