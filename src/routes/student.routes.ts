import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getDashboardStats
} from "../controllers/student.controller";
import { verifyStudent } from "../middlewares/verifyStudent";

const router = express.Router();

// My Profile
router.get("/me", verifyStudent, getMyProfile);

// Update My Profile
router.put("/me", verifyStudent, updateMyProfile);

// Dashboard Cards
router.get("/dashboard-cards", verifyStudent, getDashboardStats);

export default router;
