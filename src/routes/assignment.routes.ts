import express from "express";
import {
  createAssignment,
  getSubjectsForAssignment,
  getAssignmentsForStudent,
  updateAssignmentStatus,
  downloadAssignment 
} from "../controllers/assignment.controller";
import { verifyAdminOrProfessor } from "../middlewares/verifyAdminOrProfessor";
import { verifyStudent } from "../middlewares/verifyStudent";
import { uploadAssignment } from "../middlewares/upload";

const router = express.Router();

// Assign Assignment (Admin & Professor)
router.post(
  "/",
  verifyAdminOrProfessor,
  uploadAssignment.single("attachment"),
  createAssignment,
);

// Assignement Subjects
router.get("/for-assignment", verifyAdminOrProfessor, getSubjectsForAssignment);

// View assignments (students)
router.get("/students", verifyStudent, getAssignmentsForStudent);

// Change assignement status (students)
router.put("/:assignmentId/status", verifyStudent, updateAssignmentStatus);

// Download attachment
router.get("/download/:fileName", verifyStudent, downloadAssignment);


export default router;
