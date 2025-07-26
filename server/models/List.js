import mongoose from "mongoose";
const listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  tmdbId: {
    type: String,
    ref: "Movie",
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ["watchlist", "watched", "favorites"],
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
    index: true,
  }
}, { timestamps: true });

listSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

export default mongoose.model("List", listSchema);
