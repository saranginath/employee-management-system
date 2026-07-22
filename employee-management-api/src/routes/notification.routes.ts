import { Router } from "express";
import {
    createNotificationController,
    deleteNotificationController,
    getNotificationByIdController,
    getNotificationsController,
    markNotificationReadController,
    updateNotificationController,
} from "../controllers/notification.controller";
import { authenticate } from "../middleware/auth.middleware";

/**
 * @openapi
 * /api/v1/notifications:
 *   post:
 *     summary: Create a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created successfully
 *   get:
 *     summary: Get all notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 * /api/v1/notifications/{id}:
 *   get:
 *     summary: Get notification by id
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification details
 *   put:
 *     summary: Update a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */

const router = Router();

router.use(authenticate);

router.post("/", createNotificationController);

router.get("/", getNotificationsController);

router.get("/:id", getNotificationByIdController);

router.put("/:id", updateNotificationController);

router.patch("/:id/read", markNotificationReadController);

router.delete("/:id", deleteNotificationController);

export default router;