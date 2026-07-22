import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createHolidayService,
  deleteHolidayService,
  getHolidayByIdService,
  getHolidayService,
  updateHolidayService,
} from "../services/holiday.service";

import {
  createHolidaySchema,
  updateHolidaySchema,
} from "../validators/holiday.validator";

interface HolidayParams {
  id: string;
}
export const createHolidayController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createHolidaySchema.parse(req.body);

    const holiday = await createHolidayService(data);

    res.status(201).json({
      success: true,
      data: holiday,
    });
  },
);

export const getHolidayController = asyncHandler(
  async (_req: Request, res: Response) => {
    const holidays = await getHolidayService();

    res.status(200).json({
      success: true,
      data: holidays,
    });
  },
);

export const getHolidayByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const holiday = await getHolidayByIdService(req.params.id as string);

    res.status(200).json({
      success: true,
      data: holiday,
    });
  },
);

export const updateHolidayController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updateHolidaySchema.parse(req.body);

    const holiday = await updateHolidayService(req.params.id as string, data);

    res.status(200).json({
      success: true,
      data: holiday,
    });
  },
);

export const deleteHolidayController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteHolidayService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Holiday deleted successfully",
    });
  },
);
