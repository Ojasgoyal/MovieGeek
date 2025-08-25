import { useEffect, useState } from "react";
import axios from "axios";

export function getData(type, id) {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [data, setData] = useState({
        details: null,
        credits: null,
        movie_credits: null,
        tv_credits: null,
        videos: null,
    });


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type === "person") {
                    const [details, movie_credits, tv_credits] = await Promise.all([
                        axios.get(`${BASE_URL}/detail/${type}/${id}`),
                        axios.get(`${BASE_URL}/detail/${type}/${id}/movie_credits`),
                        axios.get(`${BASE_URL}/detail/${type}/${id}/tv_credits`),
                    ]);

                    setData({ details: details.data, movie_credits: movie_credits.data, tv_credits: tv_credits.data })
                } else {
                    const [details, credits, videos] = await Promise.all([
                        axios.get(`${BASE_URL}/detail/${type}/${id}`),
                        axios.get(`${BASE_URL}/detail/${type}/${id}/credits`),
                        axios.get(`${BASE_URL}/detail/${type}/${id}/videos`),
                    ]);

                    setData({ details: details.data, credits: credits.data, videos: videos.data })
                }
            } catch (error) {
                setError(error.message)
                console.error("Error fetching movie data:", error);
            }
            setLoading(false);
        }
        if (type && id) fetchData();
    }, [type, id])

    return { data, loading, error };
}