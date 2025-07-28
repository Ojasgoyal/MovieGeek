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
  refreshToken :{
    type:String,
    default:null
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);