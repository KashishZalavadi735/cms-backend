import express from "express";
import {
  createProfessor,
  getAllProfessor,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
  updateProfessorSubjects,
  getBranchStudents
} from "../controllers/admin.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { defaultActiveStatus } from "../middlewares/defaultActiveStatus";

const router = express.Router();

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

// View branch students
router.get("/students", verifyAdmin, getBranchStudents);

export default router;
