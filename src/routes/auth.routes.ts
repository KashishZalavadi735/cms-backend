import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/auth.controller";

const router = express.Router();

// login
router.post("/login", loginController);

// signup only for student
router.post("/signup", signupController);

export default router;
