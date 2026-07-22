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
