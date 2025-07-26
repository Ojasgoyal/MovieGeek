import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from './utils/logger.js';
import morgan from "morgan";
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from './routes/authRoutes.js';
import detailRoutes from "./routes/detailRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import trendingRoutes from "./routes/trendingRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import userListRoutes from "./routes/userListRoutes.js"
import listMovieRoutes from "./routes/listMovieRoutes.js"



const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


app.use("/user", userRoutes);
app.use("/user", followRoutes);
app.use("/user", userListRoutes);
app.use("/trending", trendingRoutes);
app.use("/", authRoutes);
app.use("/", searchRoutes);
app.use("/detail", detailRoutes);
app.use("/detail", listMovieRoutes);
app.use("/list", listRoutes);

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