import { Request, Response } from "express";

import {
    createLeaveService,
    getLeaveService,
    updateLeaveService,
    cancelLeaveService,
    approveLeaveService,
    rejectLeaveService,
    getLeaveBalanceService,
    getLeaveHistoryService,
    getPendingLeaveService,
    getLeaveCalendarService,
} from "../services/leave.service";

export const createLeaveController = async (req: Request, res: Response) => {
    const data = await createLeaveService(req.user!.id, req.body);

    res.status(201).json({
        success: true,

        message: "Leave applied successfully",

        data,
    });
};

export const getLeaveController = async (req: Request, res: Response) => {
    const data = await getLeaveService(
        req.user!.id,

        req.user!.role,
    );

    res.json({
        success: true,

        data,
    });
};

export const updateLeaveController = async (req: Request, res: Response) => {
    const data = await updateLeaveService(
        req.params.id,

        req.user!.id,

        req.body,
    );

    res.json({
        success: true,

        message: "Leave updated",

        data,
    });
};

export const cancelLeaveController = async (req: Request, res: Response) => {
    const data = await cancelLeaveService(
        req.params.id,

        req.user!.id,
    );

    res.json({
        success: true,

        message: "Leave cancelled",

        data,
    });
};

export const approveLeaveController = async (req: Request, res: Response) => {
    const data = await approveLeaveService(
        req.params.id,

        req.user!.id,
    );

    res.json({
        success: true,

        message: "Leave approved",

        data,
    });
};

export const rejectLeaveController = async (req: Request, res: Response) => {
    const data = await rejectLeaveService(
        req.params.id,

        req.user!.id,

        req.body.reason,
    );

    res.json({
        success: true,

        message: "Leave rejected",

        data,
    });
};

export const getLeaveBalanceController = async (
    req: Request,
    res: Response,
) => {
    const data = await getLeaveBalanceService(req.user!.id);

    res.json({
        success: true,

        data,
    });
};

export const getLeaveHistoryController = async (
    req: Request,
    res: Response,
) => {
    const data = await getLeaveHistoryService(req.user!.id);

    res.json({
        success: true,

        data,
    });
};

export const getPendingLeaveController = async (
    req: Request,
    res: Response,
) => {
    const data = await getPendingLeaveService();

    res.json({
        success: true,

        data,
    });
};

export const getLeaveCalendarController = async (
    req: Request,
    res: Response,
) => {
    const { start, end } = req.query;

    const data = await getLeaveCalendarService(
        req.user!.id,
        req.user!.role,

        start as string,

        end as string,
    );

    res.json({
        success: true,

        data,
    });
};
