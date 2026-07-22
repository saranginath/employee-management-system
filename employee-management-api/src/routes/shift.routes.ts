import { Router } from "express";

import {
    createShiftController,
    deleteShiftController,
    getShiftByIdController,
    getShiftsController,
    updateShiftController,
} from "../controllers/shift.controller";
import { authenticate } from "../middleware/auth.middleware";
import { ROLES } from "../constants/leave.constnt";
import { authorize } from "../middleware/authorize.middleare";



/**
 * @openapi
 * /api/v1/shifts:
 *   post:
 *     summary: Create a shift
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shift created successfully
 *   get:
 *     summary: Get all shifts
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shifts
 * /api/v1/shifts/{id}:
 *   get:
 *     summary: Get shift by id
 *     tags: [Shift]
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
 *         description: Shift details
 *   put:
 *     summary: Update a shift
 *     tags: [Shift]
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
 *               name:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shift updated successfully
 *   delete:
 *     summary: Delete a shift
 *     tags: [Shift]
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
 *         description: Shift deleted successfully
 */

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    createShiftController
);

router.get(
    "/",
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.EMPLOYEE
    ),
    getShiftsController
);

router.get(
    "/:id",
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.EMPLOYEE
    ),
    getShiftByIdController
);

router.put(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    updateShiftController
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deleteShiftController
);

export default router;