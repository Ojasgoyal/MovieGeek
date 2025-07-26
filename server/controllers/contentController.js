import axios from 'axios';

export const getContent = async (req,res)=>{
    const {type,id,content} = req.params

    const validCombinations = {
        movie: ['credits', 'videos'],
        tv: ['credits', 'videos'],
        person: ['movie_credits', 'tv_credits']
    };
    if (!validCombinations[type] || !validCombinations[type].includes(content)) {
        return res.status(400).json({ error: 'Invalid content type for this media' });
    }

    try {
        const url = `${process.env.TMDB_BASE_URL}/${type}/${id}/${content}`
        const response = await axios.get(url,{
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },            
        }) 
        const results = response.data
        res.status(200).json(results); 
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch from TMDB' });
    }
}