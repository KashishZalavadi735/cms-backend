import express from "express";
import { getMyProfile } from "../controllers/student.controller";
import { verifyStudent } from "../middlewares/verifyStudent";

const router = express.Router();

// My Profile
router.get("/me", verifyStudent, getMyProfile);

export default router;