import axios from 'axios'

export const getDetails = async (req , res) => {
    const { type, id } = req.params;
    const allowedTypes = ['movie', 'tv', 'person'];

    if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid search type' });
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`,{
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },            
        })  
        const results = response.data
        console.log("✅ Fetched details Successfully")
        res.status(200).json(results);  
    } catch (error) {
    console.error("TMDB API error:", error.message);
    res.status(500).json({ error: `Failed to fetch data from TMDB` });
    }
}
