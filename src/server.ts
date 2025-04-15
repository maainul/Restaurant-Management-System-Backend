import "reflect-metadata";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db";

import adminRoutes from "./routes/AdminRoutes"
import userRoutes from "./routes/AuthRoutes"

import errorMiddleware from "./middlewares/errorMiddleware";
import authenticate from './middlewares/authenticate';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// User Routes
app.use("/api/auth", userRoutes);
app.use("/api", authenticate, adminRoutes);



// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
