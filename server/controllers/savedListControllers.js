import axios from "axios";
import List from "../models/List.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const getListItems = async (req,res)=>{
    try {
        const {status} = req.query;
        const {username} = req.params
        
        const user = await User.findOne({username})
        if(!user) return res.status(404).json({error : "User Not Found"})
        
        const filter = {user:user._id}
        if (status) filter.status = status;
        const listItems = await List.find(filter).sort({ addedAt: -1 });
        
        const movieIds = listItems.map(item => item.tmdbId);
        
        const movies = await Movie.find({ _id: { $in: movieIds } });
        const result = listItems.map(item => ({
            ...item._doc,
            movie: movies.find(m => m._id === item.tmdbId) || null
        }));
        res.json(result);
    
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });    
    }
}


export const addToList = async (req,res) =>{
    try {
        const {type , id} = req.params
        const userId = req.user.userId
        const {status} = req.body
        const validTypes = ["movie","tv"]

        let movie = await Movie.findById(id);

        if(!validTypes.includes(type)){
            return res.status(400).json({ error: `Can't add ${type} to list` });
        }
        
        if (!movie){
            const {data} = await axios.get(`${process.env.TMDB_BASE_URL}/${type}/${id}`,{
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                },            
            })      
            movie = new Movie({
                _id: id,
                title: data.title || data.name,
                overview: data.overview,
                genres: data.genres?.map(g => g.name) || [],
                genreIds: data.genres?.map(g => g.id) || [],
                releaseDate: data.release_date || data.first_air_date,
                runtime: data.runtime || data.episode_run_time?.[0] || null,
                posterUrl: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
                backdropUrl: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null,
                tmdbRating: data.vote_average,
                voteCount: data.vote_count,
                language: data.original_language,
                popularity: data.popularity,
                type,
            });
            await movie.save();
        }
        const exists = await List.findOne({ user: userId, tmdbId: id });
        if (exists) return res.status(400).json({ error: "Movie already in list" });

        const newListItem = new List({ user: userId, tmdbId: id, status });
        await newListItem.save();

        res.status(201).json({ message: "Added to list" });

    } catch (error) {
        res.status(500).json({ error: "Failed to add to list" });
    }
}

export const removeFromList = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const removed = await List.findOneAndDelete({ user: userId, tmdbId: id });
    if (!removed) return res.status(404).json({ error: "Item not found in list" });

    res.json({ message: "Removed from list" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from list" });
  }
};
