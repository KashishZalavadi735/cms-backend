import express from "express";
import {
  sendOtpController,
  verifyOtpController,
  changePasswordController
} from "../controllers/forgotPassword.controller";

const router = express.Router();

// Forgot Password
router.post("/send-otp", sendOtpController);

// OTP Verification
router.post("/verify-otp", verifyOtpController);

// Change Password
router.post("/change-password", changePasswordController);

export default router;