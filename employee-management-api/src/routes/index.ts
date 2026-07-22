import { Router } from "express";


import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import departmentRoutes from "./department.routes";
import attendanceRoutes from "./attendance.routes";
import leaveRoutes from "./leave.routes";
import dashboardRoutes from "./dashboard.routes";
import profileRoutes from "./profile.routes";
import payrollRoutes from "./payroll.routes";
import holidayRoutes from "./holiday.routes";
import notificationRoutes from "./notification.routes";
import settingsRoutes from "./settings.routes";
import announcementRoutes from "./announcement.routes";
import shiftRoutes from "./shift.routes";
import performanceRoutes from "./performance.routes";
import recruitmentRoutes from "./recruitment.routes";
import documentRoutes from "./document.routes";
import rolePermissionRoutes from "./role-permission.routes";
import auditLogRoutes from "./audit-log.routes";


const router = Router();


// ===========================
// CORE MODULES
// ===========================

router.use("/auth", authRoutes);

router.use("/employees", employeeRoutes);

router.use("/departments", departmentRoutes);

router.use("/attendance", attendanceRoutes);

router.use("/leave", leaveRoutes);


// ===========================
// EMS MODULES
// ===========================

router.use("/dashboard", dashboardRoutes);

router.use("/profile", profileRoutes);

router.use("/payroll", payrollRoutes);

router.use("/holidays", holidayRoutes);

router.use("/notifications", notificationRoutes);

router.use("/settings", settingsRoutes);
router.use("/announcements", announcementRoutes);

router.use("/shifts", shiftRoutes);

router.use("/performance", performanceRoutes);

router.use("/recruitment", recruitmentRoutes);

router.use("/documents", documentRoutes);

router.use("/roles", rolePermissionRoutes);

router.use("/audit-logs", auditLogRoutes);



export default router;