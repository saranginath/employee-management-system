import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

import {
  createPerformanceService,
  deletePerformanceService,
  getPerformanceByIdService,
  getPerformanceService,
  updatePerformanceService,
} from "../services/performance.service";

import {
  createPerformanceSchema,
  updatePerformanceSchema,
} from "../validators/performance.validator";

export const createPerformanceController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createPerformanceSchema.parse(req.body);

    const review = await createPerformanceService({
      ...data,
      reviewer: req.user!.id,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  },
);

export const getPerformanceController = asyncHandler(
  async (_req: Request, res: Response) => {
    const reviews = await getPerformanceService();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  },
);

export const getPerformanceByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const review = await getPerformanceByIdService(req.params.id as string);

    res.status(200).json({
      success: true,
      data: review,
    });
  },
);

export const updatePerformanceController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updatePerformanceSchema.parse(req.body);

    const review = await updatePerformanceService(
      req.params.id as string,
      data,
    );

    res.status(200).json({
      success: true,
      data: review,
    });
  },
);

export const deletePerformanceController = asyncHandler(
  async (req: Request, res: Response) => {
    await deletePerformanceService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Performance review deleted successfully",
    });
  },
);
