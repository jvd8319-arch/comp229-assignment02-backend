import dotenv from "dotenv";
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

import connectDB from "./config/db.js";
connectDB();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";

import referencesRouter from "./routes/references.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import servicesRouter from "./routes/services.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/references", referencesRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/users", usersRouter);

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