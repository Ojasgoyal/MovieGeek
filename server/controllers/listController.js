import axios from "axios";

export const getTrending = async (req,res)=>{
    const {type,time} = req.params
    const validTime = ["day","week"]
    const allowedTypes = ["all","movie","tv","person"]
    const page = req.query.page || 1;

    if (!validTime.includes(time)) {
        return res.status(400).json({ error: 'Invalid search time' });
    }
    if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid search type' });
    }
    
    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/${type}/${time}`,{
            params:{
                page:page,
                region:"in"
            },  
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },  
        })     
        const results = response.data
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch data from TMDB` });
    }

}

export const getList = async (req,res) => {
    const {type,list} = req.params
    const validTypes = ["movie","person","tv"]
    const validPaths = [
    "tv/airing_today",
    "tv/on_the_air",
    "tv/top_rated",
    "movie/now_playing",
    "movie/top_rated",
    "movie/upcoming",
    ];  
    const page = req.query.page || 1;
    const path = list ? `${type}/${list}` : `${type}/popular`
    if (!validTypes.includes(type) || (list && !validPaths.includes(`${type}/${list}`))) {
        return res.status(400).json({ error: "Invalid category path" });
    }

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/${path}`,{
            params:{
                page:page,
                region:"in",
            },
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },  
        })
        res.status(200).json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category data" });
    }
}