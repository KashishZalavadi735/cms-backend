import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getDashboardStats
} from "../controllers/professor.controller";
import { verifyProfessor } from "../middlewares/verifyProfessor";

const router = express.Router();

// My Profile
router.get("/me", verifyProfessor, getMyProfile);

// Update My Profile
router.put("/me", verifyProfessor, updateMyProfile);

// Dashboard Cards
router.get("/dashboard-cards", verifyProfessor, getDashboardStats);

export default router;
