import express from "express";
import { createAssignment } from "../controllers/assignment.controller";

const router = express.Router();

// Assign Assignment (Admin & Professor)
router.post("/", createAssignment);

export default router;