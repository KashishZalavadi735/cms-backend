import express from "express";
import { setPasswordController } from "../controllers/setPassword.controller";

const router = express.Router();

// Set Password
router.post("/", setPasswordController);

export default router;
