import { Router } from "express";
import {
  createAnnouncementController,
  deleteAnnouncementController,
  getAnnouncementByIdController,
  getAnnouncementsController,
  updateAnnouncementController,
} from "../controllers/announcement.controller";
import { authenticate } from "../middleware/auth.middleware";
import { ROLES } from "../constants/leave.constnt";
import { authorize } from "../middleware/authorize.middleare";

const router = Router();

/**
 * @openapi
 * /api/v1/announcements:
 *   post:
 *     summary: Create an announcement
 *     tags: [Announcement]
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
 *               audience:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcement]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of announcements
 * /api/v1/announcements/{id}:
 *   get:
 *     summary: Get announcement by id
 *     tags: [Announcement]
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
 *         description: Announcement details
 *   put:
 *     summary: Update an announcement
 *     tags: [Announcement]
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
 *         description: Announcement updated successfully
 *   delete:
 *     summary: Delete an announcement
 *     tags: [Announcement]
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
 *         description: Announcement deleted successfully
 */

router.use(authenticate);

router.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  createAnnouncementController,
);

router.get(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
  getAnnouncementsController,
);

router.get(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
  getAnnouncementByIdController,
);

router.put(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  updateAnnouncementController,
);

router.delete("/:id", authorize(ROLES.ADMIN), deleteAnnouncementController);

export default router;
