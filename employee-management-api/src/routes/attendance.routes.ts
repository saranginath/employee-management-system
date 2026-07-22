import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/role.constant";
import {
  checkInController,
  checkOutController,
} from "../controllers/attendance.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/attendance/check-in:
 *   post:
 *     summary: Check in for the day
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: CheckIn successful
 * /api/v1/attendance/check-out:
 *   post:
 *     summary: Check out for the day
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check out successfully
 */
router.post("/check-in", authenticate, checkInController);
router.post("/check-out", authenticate, checkOutController);

export default router;
