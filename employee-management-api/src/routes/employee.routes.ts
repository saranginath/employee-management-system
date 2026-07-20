import Router from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createEmployeeController, deleteEmployeeController, getEmployeeByIdController, getEmployeeController, updateEmployeeController } from "../controllers/employee.controller";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/role";

const router = Router()

router.post('/', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), createEmployeeController);
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), getEmployeeController);
router.get('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), getEmployeeByIdController);
router.patch('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), updateEmployeeController)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), deleteEmployeeController);

export default router;