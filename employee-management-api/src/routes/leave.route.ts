import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/authorize.middleware";

import { ROLES } from "../constants/leave.constant";

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

const router = Router();

router.post("/", authenticate, createLeaveController);

router.get("/", authenticate, getLeaveController);

router.get("/balance", authenticate, getLeaveBalanceController);

router.get("/history", authenticate, getLeaveHistoryController);

router.get("/calendar", authenticate, getLeaveCalendarController);

router.get(
  "/pending",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getPendingLeaveController,
);

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

export default router;
