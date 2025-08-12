import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Movie() {
  const { type, param2:id } = useParams();
  const [movieData, setMovieData] = useState({
    data: null,
    credits: null,
    videos: null,
  });

  const BASE_URL = "http://localhost:5000/api/detail";

  async function getMovieDetails() {
    try {
      const { data } = await axios(`${BASE_URL}/${type}/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  async function getMovieVideos() {
    try {
      const { data } = await axios(`${BASE_URL}/${type}/${id}/videos`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  async function getMovieCredits() {
    try {
      const { data } = await axios(`${BASE_URL}/${type}/${id}/credits`);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  useEffect(() => {
    const getDetails = async () => {
      try {
        const [data,credits,videos] = await Promise.all([
            getMovieDetails(),
            getMovieCredits(),
            getMovieVideos()
        ])

        setMovieData({data,credits,videos})
      } catch (error) {
        console.error("cannot fetch movie details")
      }
    };
    getDetails()
  }, [type, id]);

  return (
    <>
      <div>{movieData?.data?.original_title}</div>
      
    </>
  );
}
