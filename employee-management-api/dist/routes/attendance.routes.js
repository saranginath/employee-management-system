"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const attendance_controller_1 = require("../controllers/attendance.controller");
const router = (0, express_1.Router)();
router.post('/check-in', auth_middleware_1.authenticate, attendance_controller_1.checkInController);
router.post('/check-out', auth_middleware_1.authenticate, attendance_controller_1.checkOutController);
exports.default = router;
