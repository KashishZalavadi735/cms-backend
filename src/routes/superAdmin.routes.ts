import express from "express";
import { createAdmin, getAllAdmin, getAdminById, updateAdmin, deleteAdmin, getMyProfile } from "../controllers/superAdmin.controller";
import { defaultActiveStatus } from "../middlewares/defaultActiveStatus";
import { verifySuperAdmin } from "../middlewares/verifySuperAdmin";

const router = express.Router();

// Create Admin
router.post("/admin", verifySuperAdmin, defaultActiveStatus, createAdmin);

// Get all admin
router.get("/admin", verifySuperAdmin, getAllAdmin);

// Get admin by id
router.get("/admin/:id", verifySuperAdmin, getAdminById);

// Update admin
router.put("/admin/:id", verifySuperAdmin, updateAdmin);

// Delete admin
router.delete("/admin/:id", verifySuperAdmin, deleteAdmin);

// My Profile
router.get("/me", verifySuperAdmin, getMyProfile);

export default router;