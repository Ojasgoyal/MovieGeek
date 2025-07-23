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
  avatarUrl: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  watched: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);