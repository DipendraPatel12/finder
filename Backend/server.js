const app = express();
import express from "express";
import cors from 'cors'
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));

app.use(express.json());
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import cookieParser from 'cookie-parser';

app.use(cookieParser());
import connectDB from "./config/db.js"
import authRoute from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
const Port = process.env.PORT || 8000;
import path from "path"
connectDB();

import authRoutes from './routes/authRoutes.js';
app.use("/api", authRoutes);


import userRoutes from './routes/userRoutes.js';

app.use("/api", userRoutes);

app.use("/api", authRoute);// Correct middleware path
app.use("/api/room", roomRoutes);





app.listen(Port, () => {
  console.log(`Server is listening on ${Port}`);
});


// eFPYibTqi2lHWVVQ