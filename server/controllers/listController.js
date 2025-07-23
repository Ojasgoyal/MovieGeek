import axios from "axios";

export const getTrending = async (req,res)=>{
    const {type,time} = req.params
    const validTime = ["day","week"]
    const allowedTypes = ["all","movie","tv","person"]

    if (!validTime.includes(time)) {
    return res.status(400).json({ error: 'Invalid search time' });
    }
    if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid search type' });
    }
    
    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/${type}/${time}`,{
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

    const validPaths = [
    "tv/airing_today",
    "tv/on_the_air",
    "tv/popular",
    "tv/top_rated",
    "person/popular",
    "movie/now_playing",
    "movie/top_rated",
    "movie/popular",
    "movie/upcoming",
    ];  

    const path = list ? `${type}/${list}` : type
    
    if (!validPaths.includes(path)) {
        return res.status(400).json({ error: "Invalid category path" });
    }
    
    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/${type}/${list}`,{
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },  
        })
        console.log(path);
        res.status(200).json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category data" });
    }
}