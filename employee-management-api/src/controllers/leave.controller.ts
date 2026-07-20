import { Request, Response } from "express";
import { createLeaveSchema, rejectLeaveSchema } from "../validators/leave.validator";
import { createLeaveService, getLeaveSerive, rejectLeaveService } from "../services/leave.service";
import { asyncHanlder } from "../middleware/asyncHandler";
import { Types } from "mongoose";
import { approveLeave } from "../repositories/leave.repository";
import { success } from "zod";

export const createLeaveController = asyncHanlder(async (req: Request, res: Response) => {
    const data = createLeaveSchema.parse(req.body);
    const leave = await createLeaveService(new Types.ObjectId(req.user!.id), data);
    res.status(201).json({
        success: true,
        message: "Leave created successfully",
        data: leave
    })
})
export const getLeaveController = asyncHanlder(async (req: Request, res: Response) => {
    const leave = await getLeaveSerive(req.user!.id, req.user!.role);
    res.status(200).json({
        success: true,
        data: leave
    })
})

export const approveleaveController = asyncHanlder(async (req: Request, res: Response) => {
    const leave = await approveLeave(req.params.id as string, new Types.ObjectId(req.user!.id));
    console.log(leave)
    res.status(200).json({
        success: true,
        message: "Leave approved successfully",
        data: leave
    })
})

export const rejectLeaveController = asyncHanlder(async (req, res) => {
    const data = rejectLeaveSchema.parse(req.body);
    const leave = await rejectLeaveService(
        req.params.id as string,
        req.user!.id, data.reason
    )
    res.status(200).json({
        success: true,
        message: "Leave rejected successfully",
        data: leave
    })
})