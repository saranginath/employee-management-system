import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/role";
import { checkInController, checkOutController } from "../controllers/attendance.controller";

const router = Router();

router.post('/check-in', authenticate, checkInController);
router.post('/check-out', authenticate, checkOutController)

export default router;