import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/authorize.middleare";

import {
  createLeaveController,
  getLeaveController,
  updateLeaveController,
  cancelLeaveController,
  approveLeaveController,
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
 * components:
 *   schemas:
 *     LeaveRequestBody:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *         - type
 *         - reason
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         type:
 *           type: string
 *           enum: [casual, sick, earned, unpaid]
 *         reason:
 *           type: string
 *
 * /api/v1/leave:
 *   post:
 *     tags: [Leave]
 *     summary: Apply for leave
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeaveRequestBody'
 *     responses:
 *       201:
 *         description: Leave applied successfully
 *       400:
 *         description: Invalid request or overlapping leave
 *       401:
 *         description: Unauthorized
 *   get:
 *     tags: [Leave]
 *     summary: Get leaves
 *     description: Employee gets own leaves, manager/admin gets all leaves
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave list
 *       401:
 *         description: Unauthorized
 *
 * /api/v1/leave/{id}:
 *   patch:
 *     tags: [Leave]
 *     summary: Update pending leave
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
 *             $ref: '#/components/schemas/LeaveRequestBody'
 *     responses:
 *       200:
 *         description: Leave updated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Leave not found
 *
 * /api/v1/leave/{id}/cancel:
 *   patch:
 *     tags: [Leave]
 *     summary: Cancel pending leave
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
 *         description: Leave cancelled
 *
 * /api/v1/leave/{id}/approve:
 *   patch:
 *     tags: [Leave]
 *     summary: Approve leave (manager/admin)
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
 *         description: Leave approved
 *       403:
 *         description: Forbidden
 *
 * /api/v1/leave/{id}/reject:
 *   patch:
 *     tags: [Leave]
 *     summary: Reject leave (manager/admin)
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
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave rejected
 *       403:
 *         description: Forbidden
 *
 * /api/v1/leave/pending:
 *   get:
 *     tags: [Leave]
 *     summary: Get pending leaves (manager/admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending leaves
 *       403:
 *         description: Forbidden
 *
 * /api/v1/leave/balance:
 *   get:
 *     tags: [Leave]
 *     summary: Get leave balance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave balance details
 *
 * /api/v1/leave/history:
 *   get:
 *     tags: [Leave]
 *     summary: Get leave history
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave history
 *
 * /api/v1/leave/calendar:
 *   get:
 *     tags: [Leave]
 *     summary: Get leave calendar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Calendar leaves
 */
router.post("/", authenticate, createLeaveController);
router.get("/", authenticate, getLeaveController);
router.patch("/:id", authenticate, updateLeaveController);
router.patch("/:id/cancel", authenticate, cancelLeaveController);
router.patch(
  "/:id/approve",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  approveLeaveController,
);
router.patch(
  "/:id/reject",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  rejectLeaveController,
);
router.get(
  "/pending",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getPendingLeaveController,
);
router.get("/balance", authenticate, getLeaveBalanceController);
router.get("/history", authenticate, getLeaveHistoryController);
router.get("/calendar", authenticate, getLeaveCalendarController);

export default router;
