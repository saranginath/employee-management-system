import { Request, Response } from "express";

import {
    getAdminDashboardService,
    getManagerDashboardService,
    getEmployeeDashboardService
} from "../services/dashboard.service";
import { asyncHandler } from "../middleware/asyncHandler";




export const getAdminDashboardController = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {

        const dashboard =
            await getAdminDashboardService();


        res.status(200).json({
            success: true,
            data: dashboard
        });

    }
);



export const getManagerDashboardController = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {

        const dashboard =
            await getManagerDashboardService(
                req.user!.id
            );


        res.status(200).json({
            success: true,
            data: dashboard
        });

    }
);



export const getEmployeeDashboardController = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {

        const dashboard =
            await getEmployeeDashboardService(
                req.user!.id
            );


        res.status(200).json({
            success: true,
            data: dashboard
        });

    }
);