import express from "express";
import {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
} from "../controllers/notifications.controller";
import { verifyAuth } from "../middlewares/verifyAuth";

const router = express.Router();

// All notification
router.get("/", verifyAuth, getMyNotifications);

// Unread notification
router.get("/unread-count", verifyAuth, getUnreadCount);

// Mark as read notification
router.patch("/:id/read", verifyAuth, markAsRead);

export default router;
