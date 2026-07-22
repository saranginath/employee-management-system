import { Router } from "express";
import {
    createPayrollController,
    deletePayrollController,
    getPayrollByIdController,
    getPayrollController,
    updatePayrollController,
} from "../controllers/payroll.controller";
import { authorize } from "../middleware/authorize.middleare";
import { authenticate } from "../middleware/auth.middleware";
import { ROLES } from "../constants/leave.constnt";


const router = Router();

/**
 * @openapi
 * /api/v1/payroll:
 *   post:
 *     summary: Create payroll record
 *     tags: [Payroll]
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
 *               month:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Payroll created successfully
 *   get:
 *     summary: Get all payroll records
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payroll records
 * /api/v1/payroll/{id}:
 *   get:
 *     summary: Get payroll record by id
 *     tags: [Payroll]
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
 *         description: Payroll details
 *   put:
 *     summary: Update payroll record
 *     tags: [Payroll]
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
 *         description: Payroll updated successfully
 *   delete:
 *     summary: Delete payroll record
 *     tags: [Payroll]
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
 *         description: Payroll deleted successfully
 */



router.use(authenticate);

router.post(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    createPayrollController
);

router.get(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getPayrollController
);

router.get(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getPayrollByIdController
);

router.put(
    "/:id",
    authorize(ROLES.ADMIN),
    updatePayrollController
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deletePayrollController
);

export default router;