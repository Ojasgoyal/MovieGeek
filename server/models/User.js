import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  avatar: {
    url: String,
    public_id: String
  },
  refreshTokens: [
    {
      token: String,
      createdAt: { type: Date, default: Date.now },
      device: String // optional, e.g., "Chrome", "iPhone"
    }
  ]

}, { timestamps: true });

export default mongoose.model('User', userSchema);