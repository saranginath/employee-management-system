import { Router } from "express";





import {
    getAdminDashboardController,
    getManagerDashboardController,
    getEmployeeDashboardController
} from "../controllers/dashboard.controller";
import { ROLES } from "../constants/role.constant";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";


const router = Router();

/**
 * @openapi
 * /api/v1/dashboard/admin:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data
 * /api/v1/dashboard/manager:
 *   get:
 *     summary: Get manager dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Manager dashboard data
 * /api/v1/dashboard/employee:
 *   get:
 *     summary: Get employee dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee dashboard data
 */

// All dashboard APIs require login
router.use(authenticate);



// =============================
// ADMIN DASHBOARD
// =============================

router.get(
    "/admin",
    authorize(ROLES.ADMIN),
    getAdminDashboardController
);



// =============================
// MANAGER DASHBOARD
// =============================

router.get(
    "/manager",
    authorize(
        ROLES.MANAGER,
        ROLES.ADMIN
    ),
    getManagerDashboardController
);



// =============================
// EMPLOYEE DASHBOARD
// =============================

router.get(
    "/employee",
    authorize(
        ROLES.EMPLOYEE,
        ROLES.MANAGER,
        ROLES.ADMIN
    ),
    getEmployeeDashboardController
);



export default router;