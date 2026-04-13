import express from "express";
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllProjects);
router.get("/:id", verifyToken, getProjectById);
router.post("/", verifyToken, addProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;