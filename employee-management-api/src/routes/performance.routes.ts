import { Router } from "express";

import {
  createPerformanceController,
  deletePerformanceController,
  getPerformanceByIdController,
  getPerformanceController,
  updatePerformanceController,
} from "../controllers/performance.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/leave.constnt";

const router = Router();

/**
 * @openapi
 * /api/v1/performance:
 *   post:
 *     summary: Create performance record
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *               review:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Performance record created successfully
 *   get:
 *     summary: Get all performance records
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of performance records
 * /api/v1/performance/{id}:
 *   get:
 *     summary: Get performance record by id
 *     tags: [Performance]
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
 *         description: Performance details
 *   put:
 *     summary: Update performance record
 *     tags: [Performance]
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
 *         description: Performance updated successfully
 *   delete:
 *     summary: Delete performance record
 *     tags: [Performance]
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
 *         description: Performance deleted successfully
 */

router.use(authenticate);

router.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  createPerformanceController,
);

router.get(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getPerformanceController,
);

router.get(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getPerformanceByIdController,
);

router.put(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  updatePerformanceController,
);

router.delete("/:id", authorize(ROLES.ADMIN), deletePerformanceController);

export default router;
