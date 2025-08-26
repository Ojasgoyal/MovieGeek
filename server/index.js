import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from "cookie-parser";
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
const FRONTEND_URLS = process.env.FRONTEND_URL.split(",");

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (FRONTEND_URLS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

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


app.use("/api/user", userRoutes);
app.use("/api/user", followRoutes);
app.use("/api/user", userListRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api", authRoutes);
app.use("/api", searchRoutes);
app.use("/api/detail", detailRoutes);
app.use("/api/detail", listMovieRoutes);
app.use("/api/list", listRoutes);

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

export default app;