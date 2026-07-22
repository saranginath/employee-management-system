import { Request, Response } from "express";
import { createLeaveSchema, rejectLeaveSchema, updateLeaveSchema } from "../validators/leave.validator";
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
import { asyncHandler } from "../middleware/asyncHandler";
import { Types } from "mongoose";

export const createLeaveController = asyncHandler(async (req: Request, res: Response) => {
    const data = createLeaveSchema.parse(req.body);
    const leave = await createLeaveService(new Types.ObjectId(req.user!.id), data);
    res.status(201).json({
        success: true,
        message: "Leave created successfully",
        data: leave,
    });
});

export const getLeaveController = asyncHandler(async (req: Request, res: Response) => {
    const leave = await getLeaveService(req.user!.id, req.user!.role);
    res.status(200).json({
        success: true,
        data: leave,
    });
});

export const updateLeaveController = asyncHandler(async (req: Request, res: Response) => {
    const data = updateLeaveSchema.parse(req.body);
    const leave = await updateLeaveService(req.params.id as string, req.user!.id, data);
    res.status(200).json({
        success: true,
        message: "Leave request updated successfully",
        data: leave,
    });
});

export const cancelLeaveController = asyncHandler(async (req: Request, res: Response) => {
    const leave = await cancelLeaveService(req.params.id as string, req.user!.id);
    res.status(200).json({
        success: true,
        message: "Leave request cancelled successfully",
        data: leave,
    });
});

export const approveleaveController = asyncHandler(async (req: Request, res: Response) => {
    const leave = await approveLeaveService(req.params.id as string, req.user!.id);
    res.status(200).json({
        success: true,
        message: "Leave approved successfully",
        data: leave,
    });
});

export const rejectLeaveController = asyncHandler(async (req: Request, res: Response) => {
    const data = rejectLeaveSchema.parse(req.body);
    const leave = await rejectLeaveService(req.params.id as string, req.user!.id, data.reason);
    res.status(200).json({
        success: true,
        message: "Leave rejected successfully",
        data: leave,
    });
});

export const getPendingLeaveController = asyncHandler(async (_req: Request, res: Response) => {
    const leaves = await getPendingLeaveService();
    res.status(200).json({
        success: true,
        data: leaves,
    });
});

export const getLeaveBalanceController = asyncHandler(async (req: Request, res: Response) => {
    const balance = await getLeaveBalanceService(req.user!.id);
    res.status(200).json({
        success: true,
        data: balance,
    });
});

export const getLeaveHistoryController = asyncHandler(async (req: Request, res: Response) => {
    const history = await getLeaveHistoryService(req.user!.id);
    res.status(200).json({
        success: true,
        data: history,
    });
});

export const getLeaveCalendarController = asyncHandler(async (req: Request, res: Response) => {
    const calendar = await getLeaveCalendarService(req.user!.id, req.user!.role);
    res.status(200).json({
        success: true,
        data: calendar,
    });
});
