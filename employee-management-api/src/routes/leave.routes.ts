import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/authorize.middleare";

import {
  createLeaveController,
  getLeaveController,
  updateLeaveController,
  cancelLeaveController,
  approveleaveController,
  rejectLeaveController,
  getLeaveBalanceController,
  getLeaveHistoryController,
  getPendingLeaveController,
  getLeaveCalendarController,
} from "../controllers/leave.controller";

import { ROLES } from "../constants/leave.constnt";

const router = Router();

/**
 * @openapi
 * /api/v1/leave:
 *   post:
 *     summary: Apply for leave
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Leave request created successfully
 *   get:
 *     summary: Get own leave requests
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leave requests
 * /api/v1/leave/{id}:
 *   patch:
 *     summary: Update a pending leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave updated successfully
 * /api/v1/leave/{id}/cancel:
 *   patch:
 *     summary: Cancel own leave request
 *     tags: [Leave]
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
 *         description: Leave cancelled successfully
 * /api/v1/leave/{id}/approve:
 *   patch:
 *     summary: Approve a leave request
 *     tags: [Leave]
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
 *         description: Leave approved successfully
 * /api/v1/leave/{id}/reject:
 *   patch:
 *     summary: Reject a leave request
 *     tags: [Leave]
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
 *         description: Leave rejected successfully
 * /api/v1/leave/pending:
 *   get:
 *     summary: Get pending leave requests (manager/admin)
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending leave requests
 * /api/v1/leave/balance:
 *   get:
 *     summary: Get leave balance
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave balance details
 * /api/v1/leave/history:
 *   get:
 *     summary: Get leave history
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave history
 * /api/v1/leave/calendar:
 *   get:
 *     summary: Get leave calendar
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave calendar data
 */

/**
 * Employee Apply Leave
 */
router.post("/", authenticate, createLeaveController);

/**
 * Get Own Leaves
 */
router.get("/", authenticate, getLeaveController);

/**
 * Update Pending Leave
 */
router.patch("/:id", authenticate, updateLeaveController);

/**
 * Cancel Own Leave
 */
router.patch("/:id/cancel", authenticate, cancelLeaveController);

/**
 * Approve Leave
 * Manager/Admin only
 */
router.patch(
  "/:id/approve",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  approveleaveController,
);

/**
 * Reject Leave
 * Manager/Admin only
 */
router.patch(
  "/:id/reject",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  rejectLeaveController,
);

/**
 * Manager Pending Requests
 */
router.get(
  "/pending",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getPendingLeaveController,
);

/**
 * Leave Balance
 */
router.get("/balance", authenticate, getLeaveBalanceController);

/**
 * Leave History
 */
router.get("/history", authenticate, getLeaveHistoryController);

/**
 * Leave Calendar
 */
router.get("/calendar", authenticate, getLeaveCalendarController);

export default router;
