"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_middleare_1 = require("../middleware/authorize.middleare");
const auth_middleware_1 = require("../middleware/auth.middleware");
const leave_controller_1 = require("../controllers/leave.controller");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/v1/leave:
 *   post:
 *     summary: Create a leave request
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
 *               type:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Leave created successfully
 *   get:
 *     summary: Get leave requests for the current user
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave list
 * /api/v1/leave/{id}/approve:
 *   put:
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
 *   put:
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
 */
router.post('/', auth_middleware_1.authenticate, leave_controller_1.createLeaveController);
router.get('/', auth_middleware_1.authenticate, leave_controller_1.getLeaveController);
router.put('/:id/approve', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(constants_1.ROLES.ADMIN, constants_1.ROLES.MANAGER), leave_controller_1.approveleaveController);
router.put('/:id/reject', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(constants_1.ROLES.ADMIN, constants_1.ROLES.MANAGER), leave_controller_1.rejectLeaveController);
exports.default = router;
