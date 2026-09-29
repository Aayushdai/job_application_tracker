import express from "express";
import {
    getNotifications,
    getNotification,
    markAsRead,
    remove
} from "../controllers/notification.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getNotifications);
router.get("/:notificationId", getNotification);
router.patch("/:id/read", markAsRead);
router.delete("/:id", remove);
export default router;