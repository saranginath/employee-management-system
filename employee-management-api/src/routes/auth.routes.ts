import { Router } from "express";
import { changePassword, login, logout, refreshToken, register } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post('/register', register);
router.post('/login', login)
router.post('/refresh-token', refreshToken);
router.post('/logout', authenticate, logout)
router.patch('/change-password', authenticate, changePassword)
export default router;