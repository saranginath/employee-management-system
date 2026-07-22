import { Request, Response } from "express";
import { asyncHandler } from '../middleware/asyncHandler';
import {
    createNotificationService,
    deleteNotificationService,
    getNotificationByIdService,
    getNotificationsService,
    markNotificationReadService,
    updateNotificationService,
} from "../services/notification.service";

import {
    createNotificationSchema,
    updateNotificationSchema,
} from "../validators/notification.validator";

export const createNotificationController = asyncHandler(async (req: Request, res: Response) => {
    const data = createNotificationSchema.parse(req.body);

    const notification = await createNotificationService({
        ...data,
        user: req.user!.id,
    });

    res.status(201).json({
        success: true,
        data: notification,
    });
});

export const getNotificationsController = asyncHandler(async (req: Request, res: Response) => {
    const notifications = await getNotificationsService(req.user!.id);

    res.status(200).json({
        success: true,
        data: notifications,
    });
});

export const getNotificationByIdController = asyncHandler(async (req: Request, res: Response) => {
    const notification = await getNotificationByIdService(req.params.id as string);

    res.status(200).json({
        success: true,
        data: notification,
    });
});

export const updateNotificationController = asyncHandler(async (req: Request, res: Response) => {
    const data = updateNotificationSchema.parse(req.body);

    const notification = await updateNotificationService(req.params.id as string, data);

    res.status(200).json({
        success: true,
        data: notification,
    });
});

export const markNotificationReadController = asyncHandler(async (req: Request, res: Response) => {
    const notification = await markNotificationReadService(req.params.id as string);

    res.status(200).json({
        success: true,
        data: notification,
    });
});

export const deleteNotificationController = asyncHandler(async (req: Request, res: Response) => {
    await deleteNotificationService(req.params.id as string);

    res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
    });
});