import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/role";
import { createDepartmentController, getDepartmentController } from "../controllers/department.controller";
import { getEmployeeByIdController } from "../controllers/employee.controller";

const router = Router();

router.post('/', authenticate, authorize(ROLES.ADMIN), createDepartmentController);
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.EMPLOYEE, ROLES.MANAGER), getDepartmentController);

export default router;