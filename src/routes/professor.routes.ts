import express from "express";
import { getMyProfile } from "../controllers/professor.controller";
import { verifyProfessor } from "../middlewares/verifyProfessor";

const router = express.Router();

// My Profile
router.get("/me", verifyProfessor, getMyProfile);

export default router;