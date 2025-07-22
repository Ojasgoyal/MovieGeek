import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  _id: {
    type: String, // Use TMDB ID or any custom ID
    required: true,
  },
  title: String,
  overview: String,
  genres: [String],
  releaseDate: Date,
  runtime: String,
  posterUrl: String,
  backdropUrl: String,
  tmdbRating: Number,
  voteCount: Number,
  language: String,
  popularity: Number,
}, { timestamps: true }); // adds createdAt and updatedAt

export default mongoose.model('Movie', movieSchema);