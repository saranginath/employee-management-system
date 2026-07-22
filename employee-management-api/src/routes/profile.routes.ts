import { Router } from "express";

import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  changePassword,
} from "../controllers/profile.controller";

import { authenticate } from "../middleware/auth.middleware";

import { uploadProfile } from "../middleware/upload.middleware";

const router = Router();

/**
 * @openapi
 * /api/v1/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *   patch:
 *     summary: Update current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               designation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 * /api/v1/profile/picture:
 *   patch:
 *     summary: Upload profile picture
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 * /api/v1/profile/change-password:
 *   patch:
 *     summary: Change password for current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 */

router.use(authenticate);

router.get("/", getProfile);

router.patch("/", updateProfile);

router.patch("/picture", uploadProfile.single("image"), uploadProfilePicture);

router.patch("/change-password", changePassword);

export default router;
