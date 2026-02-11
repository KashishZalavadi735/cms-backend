import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/auth.controller";
import { defaultActiveStatus } from "../middlewares/defaultActiveStatus";

const router = express.Router();

// Login
router.post("/login", loginController);

// Signup only for student
router.post("/signup", defaultActiveStatus, signupController);

export default router;
