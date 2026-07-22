import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

import {
    createShiftService,
    deleteShiftService,
    getShiftByIdService,
    getShiftsService,
    updateShiftService,
} from "../services/shift.service";

import {
    createShiftSchema,
    updateShiftSchema,
} from "../validators/shift.validator";

export const createShiftController = asyncHandler(async (req: Request, res: Response) => {
    const data = createShiftSchema.parse(req.body);

    const shift = await createShiftService(data);

    res.status(201).json({
        success: true,
        data: shift,
    });
});

export const getShiftsController = asyncHandler(async (_req: Request, res: Response) => {
    const shifts = await getShiftsService();

    res.status(200).json({
        success: true,
        data: shifts,
    });
});

export const getShiftByIdController = asyncHandler(async (req: Request, res: Response) => {
    const shift = await getShiftByIdService(req.params.id as string);

    res.status(200).json({
        success: true,
        data: shift,
    });
});

export const updateShiftController = asyncHandler(async (req: Request, res: Response) => {
    const data = updateShiftSchema.parse(req.body);

    const shift = await updateShiftService(req.params.id as string, data);

    res.status(200).json({
        success: true,
        data: shift,
    });
});

export const deleteShiftController = asyncHandler(async (req: Request, res: Response) => {
    await deleteShiftService(req.params.id as string);

    res.status(200).json({
        success: true,
        message: "Shift deleted successfully",
    });
});