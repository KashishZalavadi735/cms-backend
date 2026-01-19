import express from "express";
import { getBranchStudents } from "../controllers/professor.controller";
import { verifyProfessor } from "../middlewares/verifyProfessor";

const router = express.Router();

// View branch students
router.get("/students", verifyProfessor, getBranchStudents);

export default router;