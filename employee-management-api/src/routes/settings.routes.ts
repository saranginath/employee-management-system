import { Router } from "express";

import {
  createSettings,
  getSettings,
  updateSettings,
} from "../controllers/settings.controller";
import { ROLES } from "../constants/role.constant";
import { authorize } from "../middleware/authorize.middleare";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

/**
 * @openapi
 * /api/v1/settings:
 *   post:
 *     summary: Create application settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Settings created successfully
 *   get:
 *     summary: Get application settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current settings
 *   patch:
 *     summary: Update application settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 */

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN), createSettings);
router.get("/", authorize(ROLES.ADMIN, ROLES.MANAGER), getSettings);
router.patch("/", authorize(ROLES.ADMIN), updateSettings);

export default router;
