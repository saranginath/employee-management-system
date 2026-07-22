import { Router } from "express";

import {
  getAuditLogsController,
  getAuditLogByIdController,
  getUserAuditLogsController,
  deleteAuditLogController,
} from "../controllers/auditLog.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/leave.constnt";

const router = Router();

/**
 * @openapi
 * /api/v1/audit-logs:
 *   get:
 *     summary: Get all audit logs
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of audit logs
 * /api/v1/audit-logs/{id}:
 *   get:
 *     summary: Get audit log by id
 *     tags: [AuditLog]
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
 *         description: Audit log details
 *   delete:
 *     summary: Delete an audit log
 *     tags: [AuditLog]
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
 *         description: Audit log deleted successfully
 * /api/v1/audit-logs/user/{userId}:
 *   get:
 *     summary: Get audit logs for a specific user
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User audit logs
 */

router.use(authenticate);

/*
Admin & HR can view audit history
*/

router.get("/", authorize(ROLES.ADMIN), getAuditLogsController);

router.get("/:id", authorize(ROLES.ADMIN), getAuditLogByIdController);

router.get("/user/:userId", authorize(ROLES.ADMIN), getUserAuditLogsController);

router.delete("/:id", authorize(ROLES.ADMIN), deleteAuditLogController);

export default router;
