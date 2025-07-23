import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from './routes/authRoutes.js';
import detailRoutes from "./routes/detailRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import trendingRoutes from "./routes/trendingRoutes.js"


dotenv.config();

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", searchRoutes);
app.use("/api/details", detailRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/list", listRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get('/',(req,res) => {
    res.send('Welcome to MovieGeek APP')
})

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('✅ MongoDB connected');
    app.listen(PORT , ()=>console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});