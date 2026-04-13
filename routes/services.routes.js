import express from "express";
import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllServices);
router.get("/:id", verifyToken, getServiceById);
router.post("/", verifyToken, addService);
router.put("/:id", verifyToken, updateService);
router.delete("/:id", verifyToken, deleteService);

export default router;