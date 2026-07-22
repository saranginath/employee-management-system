import { Router } from "express";

import {
    createHolidayController,
    deleteHolidayController,
    getHolidayByIdController,
    getHolidayController,
    updateHolidayController,
} from "../controllers/holiday.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/leave.constnt";



/**
 * @openapi
 * /api/v1/holidays:
 *   post:
 *     summary: Create a holiday
 *     tags: [Holiday]
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
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Holiday created successfully
 *   get:
 *     summary: Get all holidays
 *     tags: [Holiday]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of holidays
 * /api/v1/holidays/{id}:
 *   get:
 *     summary: Get holiday by id
 *     tags: [Holiday]
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
 *         description: Holiday details
 *   put:
 *     summary: Update a holiday
 *     tags: [Holiday]
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
 *         description: Holiday updated successfully
 *   delete:
 *     summary: Delete a holiday
 *     tags: [Holiday]
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
 *         description: Holiday deleted successfully
 */

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(ROLES.ADMIN),
    createHolidayController
);

router.get(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    getHolidayController
);

router.get(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    getHolidayByIdController
);

router.put(
    "/:id",
    authorize(ROLES.ADMIN),
    updateHolidayController
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deleteHolidayController
);

export default router;