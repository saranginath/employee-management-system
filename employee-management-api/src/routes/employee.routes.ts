import Router from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createEmployeeController,
  deleteEmployeeController,
  getEmployeeByIdController,
  getEmployeesController,
  updateEmployeeController,
} from "../controllers/employee.controller";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/role.constant";

const router = Router();

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create an employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               department:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by id
 *     tags: [Employee]
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
 *         description: Employee details
 *   patch:
 *     summary: Update an employee
 *     tags: [Employee]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               department:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
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
 *         description: Employee deleted successfully
 */
router.use(authenticate);
router.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  createEmployeeController,
);
router.get("/", authorize(ROLES.ADMIN, ROLES.MANAGER), getEmployeesController);
router.get(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getEmployeeByIdController,
);
router.patch(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  updateEmployeeController,
);
router.delete(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  deleteEmployeeController,
);

export default router;
