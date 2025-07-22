import axios from 'axios'

export const search = async (req , res) => {
    const type = req.params.type
    const query = req.query.query
    const allowedTypes = ['multi', 'movie', 'tv', 'person'];

    if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid search type' });
    }

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/${type}`,{
            params:{query,
            include_adult: false, 
            language: 'en-US',
            page: 1
            },
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },            
        })  
        const results = response.data.results
        console.log("✅ Searched Successfully")
        res.status(200).json(results);  
    } catch (error) {
    console.error("TMDB API error:", error.message);
    res.status(500).json({ error: `Failed to fetch data from TMDB` });
    }
}
