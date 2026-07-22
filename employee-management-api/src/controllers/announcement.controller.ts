import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

import {
  createAnnouncementService,
  deleteAnnouncementService,
  getAnnouncementByIdService,
  getAnnouncementsService,
  updateAnnouncementService,
} from "../services/announcement.service";

import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from "../validators/announcement.validator";

export const createAnnouncementController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createAnnouncementSchema.parse(req.body);

    const announcement = await createAnnouncementService({
      ...data,
      createdBy: req.user!.id,
    });

    res.status(201).json({
      success: true,
      data: announcement,
    });
  },
);

export const getAnnouncementsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const announcements = await getAnnouncementsService();

    res.status(200).json({
      success: true,
      data: announcements,
    });
  },
);

export const getAnnouncementByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const announcement = await getAnnouncementByIdService(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: announcement,
    });
  },
);

export const updateAnnouncementController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updateAnnouncementSchema.parse(req.body);

    const announcement = await updateAnnouncementService(
      req.params.id as string,
      data,
    );

    res.status(200).json({
      success: true,
      data: announcement,
    });
  },
);

export const deleteAnnouncementController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteAnnouncementService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  },
);
