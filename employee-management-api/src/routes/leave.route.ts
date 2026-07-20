import { Router } from "express";
import { authorize } from "../middleware/authorize.middleare";
import { authenticate } from "../middleware/auth.middleware";
import { approveleaveController, createLeaveController, getLeaveController, rejectLeaveController } from "../controllers/leave.controller";
import { ROLES } from "../constants";
const router = Router();

router.post('/', authenticate, createLeaveController);
router.get('/', authenticate, getLeaveController)
router.put('/:id/approve', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), approveleaveController);
router.put('/:id/reject', authenticate, authorize(ROLES.ADMIN, ROLES.MANAGER), rejectLeaveController);


export default router;