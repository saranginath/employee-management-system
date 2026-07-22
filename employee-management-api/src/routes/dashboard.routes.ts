import { Router } from "express";

import {
  getAdminDashboardController,
  getEmployeeDashboardController,
  getManagerDashboard,
} from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/role.constant";
const router = Router();

router.get(
  "/admin",
  authenticate,
  authorize(ROLES.ADMIN),
  getAdminDashboardController,
);
router.get(
  "/employee",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  getEmployeeDashboardController,
);
router.get(
  "/manager",
  authenticate,
  authorize(ROLES.MANAGER),
  getManagerDashboard,
);

export default router;
