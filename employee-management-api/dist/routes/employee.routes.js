"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const employee_controller_1 = require("../controllers/employee.controller");
const authorize_middleare_1 = require("../middleware/authorize.middleare");
const role_constant_1 = require("../constants/role.constant");
const router = (0, express_1.default)();
/**
 * @openapi
 * /api/v1/employee:
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
 * /api/v1/employee/{id}:
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
router.use(auth_middleware_1.authenticate);
router.post('/', (0, authorize_middleare_1.authorize)(role_constant_1.ROLES.ADMIN, role_constant_1.ROLES.MANAGER), employee_controller_1.createEmployeeController);
router.get('/', (0, authorize_middleare_1.authorize)(role_constant_1.ROLES.ADMIN, role_constant_1.ROLES.MANAGER), employee_controller_1.getEmployeeController);
router.get('/:id', (0, authorize_middleare_1.authorize)(role_constant_1.ROLES.ADMIN, role_constant_1.ROLES.MANAGER), employee_controller_1.getEmployeeByIdController);
router.patch('/:id', (0, authorize_middleare_1.authorize)(role_constant_1.ROLES.ADMIN, role_constant_1.ROLES.MANAGER), employee_controller_1.updateEmployeeController);
router.delete('/:id', (0, authorize_middleare_1.authorize)(role_constant_1.ROLES.ADMIN, role_constant_1.ROLES.MANAGER), employee_controller_1.deleteEmployeeController);
exports.default = router;
