import { asyncHandler } from "../middleware/asyncHandler";
import { Request, Response } from "express";
import { checkInSchema } from "../validators/attendance.validator";
import {
  checkInService,
  checkOutService,
} from "../services/attendance.service";

export const checkInController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = checkInSchema.parse(req.body);
    const attendance = await checkInService(req.user!.id, data);

    res.status(201).json({
      success: true,
      message: "CheckIn successful",
      data: attendance,
    });
  },
);

export const checkOutController = asyncHandler(
  async (req: Request, res: Response) => {
    const attendance = await checkOutService(req.user!.id);
    res.status(200).json({
      success: true,
      message: "Check out successfully",
      data: attendance,
    });
  },
);
