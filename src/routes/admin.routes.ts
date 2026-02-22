import express from "express";
import {
  createProfessor,
  getAllProfessor,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
  updateProfessorSubjects,
  getBranchSubjects,
  getMyProfile,
  updateMyProfile,
  getProfessorSummary,
  getDashboardStats,
} from "../controllers/admin.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { defaultActiveStatus } from "../middlewares/defaultActiveStatus";

const router = express.Router();

// Dashboard Cards
router.get("/dashboard-cards", verifyAdmin, getDashboardStats);

// Professor summary
router.get("/professor/summary", verifyAdmin, getProfessorSummary);

// Create Professor
router.post("/professor", verifyAdmin, defaultActiveStatus, createProfessor);

// Get all Professor
router.get("/professor", verifyAdmin, getAllProfessor);

// Get Professor by id
router.get("/professor/:id", verifyAdmin, getProfessorById);

// Update Professor
router.put("/professor/:id", verifyAdmin, updateProfessor);

// Delete Professor
router.delete("/professor/:id", verifyAdmin, deleteProfessor);

// Assign subject to existing professor
router.put("/professor/:id/subjects", verifyAdmin, updateProfessorSubjects);

// Subjects
router.get("/subjects", verifyAdmin, getBranchSubjects);

// My Profile
router.get("/me", verifyAdmin, getMyProfile);

// Update My Profile
router.put("/me", verifyAdmin, updateMyProfile);

export default router;
