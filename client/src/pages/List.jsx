import { useParams, Navigate } from "react-router-dom";
import ListSection from "../components/Sections/ListSection";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";

export default function List() {
  const { type, list } = useParams();
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);

  const validTypes = ["movie", "tv", "person"];
  const validPaths = [
    "movie",
    "tv",
    "person",
    "tv/airing_today",
    "tv/on_the_air",
    "tv/top_rated",
    "movie/now_playing",
    "movie/top_rated",
    "movie/upcoming",
  ];

  let path = `${type}/${list}`;
  if (list === "popular") {
    path = `${type}`;
  }

  async function getListData() {
    try {
      const { data } = await axios(`http://localhost:5000/api/list/${path}`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  const isNotValid = !validTypes.includes(type) || !validPaths.includes(path);

  useEffect(() => {
    if(isNotValid)
    {
      return;
    }
    setShowList(false);
    getListData().then((res) => {
      setData(res);
      setShowList(true);
    });
  }, [type, list]);

  if (isNotValid){
    return <Navigate to="/404" replace />;
  }

  const titleMap = {
    popular: "Popular",
    now_playing: "Now Playing",
    upcoming: "Upcoming",
    top_rated: "Top Rated",
    airing_today: "Airing Today",
    on_the_air: "On the Air",
  };

  const sectionTitle = titleMap[list] || list;
  let typeName = ""
  if(type === 'person'){
    typeName = "People"
  } else if(type === 'movie'){
   typeName = `${type}s`
  } else {
    typeName = `Shows`
  }
  
  return (
    <>
      <SearchBar/>
      <div className="flex flex-col mt-4 justify-center items-center py-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight capitalize">
          {sectionTitle} {typeName}
        </h2>
        <div
          className={`mt-6 w-full max-w-7xl fade-container ${
            showList ? "visible" : ""
          }`}
        >
          <ListSection type={type} itemData={data} />
        </div>
      </div>
    </>
  );
}
