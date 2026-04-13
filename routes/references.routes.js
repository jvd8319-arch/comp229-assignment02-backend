import express from "express";
import {
  getAllReferences,
  getReferenceById,
  addReference,
  updateReference,
  deleteReference,
} from "../controllers/references.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllReferences);
router.get("/:id", verifyToken, getReferenceById);
router.post("/", verifyToken, addReference);
router.put("/:id", verifyToken, updateReference);
router.delete("/:id", verifyToken, deleteReference);

export default router;