import { Router } from "express";

import {
    createDepartmentController,
    getDepartmentsController,
    getDepartmentByIdController,
    updateDepartmentController,
    deleteDepartmentController
}
    from "../controllers/department.controller";

import { authenticate } from "../middleware/auth.middleware";


const router = Router();

/**
 * @openapi
 * /api/v1/departments:
 *   post:
 *     summary: Create a department
 *     tags: [Department]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
 *   get:
 *     summary: Get all departments
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of departments
 * /api/v1/departments/{id}:
 *   get:
 *     summary: Get department by id
 *     tags: [Department]
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
 *         description: Department details
 *   patch:
 *     summary: Update a department
 *     tags: [Department]
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 *   delete:
 *     summary: Delete a department
 *     tags: [Department]
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
 *         description: Department deleted successfully
 */

router.use(authenticate)



router.post(
    "/",
    createDepartmentController
);



router.get(
    "/",
    getDepartmentsController
);



router.get(
    "/:id",
    getDepartmentByIdController
);



router.patch(
    "/:id",
    updateDepartmentController
);



router.delete(
    "/:id",
    deleteDepartmentController
);



export default router;