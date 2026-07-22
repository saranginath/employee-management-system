import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

import {
  createRecruitmentService,
  deleteRecruitmentService,
  getRecruitmentByIdService,
  getRecruitmentService,
  updateRecruitmentService,
} from "../services/recruitment.service";

import {
  createRecruitmentSchema,
  updateRecruitmentSchema,
} from "../validators/recruitment.validator";

export const createRecruitmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createRecruitmentSchema.parse(req.body);

    const recruitment = await createRecruitmentService(data);

    res.status(201).json({
      success: true,
      data: recruitment,
    });
  },
);

export const getRecruitmentController = asyncHandler(
  async (_req: Request, res: Response) => {
    const recruitments = await getRecruitmentService();

    res.status(200).json({
      success: true,
      data: recruitments,
    });
  },
);

export const getRecruitmentByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const recruitment = await getRecruitmentByIdService(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: recruitment,
    });
  },
);

export const updateRecruitmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updateRecruitmentSchema.parse(req.body);

    const recruitment = await updateRecruitmentService(
      req.params.id as string,
      data,
    );

    res.status(200).json({
      success: true,
      data: recruitment,
    });
  },
);

export const deleteRecruitmentController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteRecruitmentService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Recruitment deleted successfully",
    });
  },
);
