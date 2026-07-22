import { Request, Response } from "express";
import { getAdminDashboardService } from "../services/dashboard.service";

import { getEmployeeDashboardService } from "../services/employeeDashboard.service";
import { asyncHandler } from "../middleware/asyncHandler";
import { getManagerDashboardService } from "../services/managerDashboard.service";

export const getAdminDashboardController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getAdminDashboardService();
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getEmployeeDashboardController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const dashboard = await getEmployeeDashboardService(userId);

    res.status(200).json({
      success: true,

      data: dashboard,
    });
  },
);

export const getManagerDashboard = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const data = await getManagerDashboardService(userId);

  res.status(200).json({
    success: true,

    data,
  });
};
