import express from "express";
import { getBranchStudents } from "../controllers/branchStudents.controller";
import { verifyAdminOrProfessor } from "../middlewares/verifyAdminOrProfessor";

const router = express.Router();

// View branch students
router.get("/", verifyAdminOrProfessor, getBranchStudents);

export default router;