const app = express();
import express from "express";
import cors from 'cors'
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv";
const corsOptions = {
  origin: ["https://finder-pi-lilac.vercel.app",
    "http://localhost:5174"
  ],
  credentials: true // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));

app.use(express.json());
dotenv.config(); // Load environment variables

app.use(cookieParser());
const Port = process.env.PORT || 8000;

connectDB();
app.use("/api", authRoutes);



app.use("/api", userRoutes);

app.use("/api", roomRoutes);





app.listen(Port, () => {
  console.log(`Server is listening on ${Port}`);
});


// eFPYibTqi2lHWVVQ