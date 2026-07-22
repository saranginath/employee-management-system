import { Router } from "express";

import {
  createRolePermissionController,
  getRolesController,
  getRoleByIdController,
  updateRolePermissionController,
  deleteRolePermissionController,
} from "../controllers/rolePermission.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/leave.constnt";
const router = Router();

/**
 * @openapi
 * /api/v1/roles:
 *   post:
 *     summary: Create a role permission entry
 *     tags: [Role]
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
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 * /api/v1/roles/{id}:
 *   get:
 *     summary: Get role by id
 *     tags: [Role]
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
 *         description: Role details
 *   patch:
 *     summary: Update a role
 *     tags: [Role]
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
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *   delete:
 *     summary: Delete a role
 *     tags: [Role]
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
 *         description: Role deleted successfully
 */

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN), createRolePermissionController);

router.get("/", authorize(ROLES.ADMIN, ROLES.MANAGER), getRolesController);

router.get("/:id", authorize(ROLES.ADMIN), getRoleByIdController);

router.patch("/:id", authorize(ROLES.ADMIN), updateRolePermissionController);

router.delete("/:id", authorize(ROLES.ADMIN), deleteRolePermissionController);

export default router;
