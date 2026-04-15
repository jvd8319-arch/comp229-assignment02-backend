// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";
import connectDB from "./config/db.js";
import mongoose from "mongoose"; // For DB name logging

// Routers
import authRouter from "./routes/auth.routes.js";
import referencesRouter from "./routes/references.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import servicesRouter from "./routes/services.routes.js";
import usersRouter from "./routes/users.routes.js";

// Auth middleware
import { verifyToken } from "./middleware/auth.middleware.js";

// Connect DB
connectDB();

// Log DB name
mongoose.connection.on("connected", () => {
  console.log("🔥 Connected to DB:", mongoose.connection.name);
});

const app = express();

// Middleware
app.use(morgan("dev"));

// ⭐ FIXED CORS CONFIGURATION (REQUIRED FOR TOKEN TO WORK ON RENDER)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://comp229-assignment1-usvy.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Test OK" });
});

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/projects", verifyToken, projectsRouter);
app.use("/api/references", verifyToken, referencesRouter);
app.use("/api/services", verifyToken, servicesRouter);
app.use("/api/users", verifyToken, usersRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});