"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorize_middleare_1 = require("../middleware/authorize.middleare");
const leave_controller_1 = require("../controllers/leave.controller");
const leave_constnt_1 = require("../constants/leave.constnt");
const router = (0, express_1.Router)();
/**
 * Employee Apply Leave
 */
router.post("/", auth_middleware_1.authenticate, leave_controller_1.createLeaveController);
/**
 * Get Own Leaves
 */
router.get("/", auth_middleware_1.authenticate, leave_controller_1.getLeaveController);
/**
 * Update Pending Leave
 */
router.patch("/:id", auth_middleware_1.authenticate, leave_controller_1.updateLeaveController);
/**
 * Cancel Own Leave
 */
router.patch("/:id/cancel", auth_middleware_1.authenticate, leave_controller_1.cancelLeaveController);
/**
 * Approve Leave
 * Manager/Admin only
 */
router.patch("/:id/approve", auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(leave_constnt_1.ROLES.ADMIN, leave_constnt_1.ROLES.MANAGER), leave_controller_1.approveleaveController);
/**
 * Reject Leave
 * Manager/Admin only
 */
router.patch("/:id/reject", auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(leave_constnt_1.ROLES.ADMIN, leave_constnt_1.ROLES.MANAGER), leave_controller_1.rejectLeaveController);
/**
 * Manager Pending Requests
 */
router.get("/pending", auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(leave_constnt_1.ROLES.ADMIN, leave_constnt_1.ROLES.MANAGER), leave_controller_1.getPendingLeaveController);
/**
 * Leave Balance
 */
router.get("/balance", auth_middleware_1.authenticate, leave_controller_1.getLeaveBalanceController);
/**
 * Leave History
 */
router.get("/history", auth_middleware_1.authenticate, leave_controller_1.getLeaveHistoryController);
/**
 * Leave Calendar
 */
router.get("/calendar", auth_middleware_1.authenticate, leave_controller_1.getLeaveCalendarController);
exports.default = router;
