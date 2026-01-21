import express from "express";
import { createAssignment, getAssignmentsForStudent, updateAssignmentStatus } from "../controllers/assignment.controller";
import { verifyAdminOrProfessor } from "../middlewares/verifyAdminOrProfessor";
import { verifyStudent } from "../middlewares/verifyStudent";

const router = express.Router();

// Assign Assignment (Admin & Professor)
router.post("/", verifyAdminOrProfessor, createAssignment);

// View assignments (students)
router.get("/students", verifyStudent, getAssignmentsForStudent);

// Change assignement status (students)
router.put("/:assignmentId/status", verifyStudent, updateAssignmentStatus);

export default router;