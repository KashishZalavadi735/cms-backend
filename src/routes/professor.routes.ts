import express from "express";
import { getMyProfile, getBranchStudents } from "../controllers/professor.controller";
import { verifyProfessor } from "../middlewares/verifyProfessor";

const router = express.Router();

// My Profile
router.get("/me", verifyProfessor, getMyProfile);

// View branch students
router.get("/students", verifyProfessor, getBranchStudents);

export default router;