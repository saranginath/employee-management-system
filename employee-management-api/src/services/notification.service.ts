import * as notificationRepository from "../repositories/notification.repository";
import { AppError } from "../utils/AppError";

export const createNotificationService = (data: any) => {
  return notificationRepository.createNotification(data);
};

export const getNotificationsService = (userId: string) => {
  return notificationRepository.getNotifications(userId);
};

export const getNotificationByIdService = async (id: string) => {
  const notification = await notificationRepository.getNotificationById(id);

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return notification;
};

export const updateNotificationService = async (id: string, data: any) => {
  const notification = await notificationRepository.updateNotification(
    id,
    data,
  );

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return notification;
};

export const markNotificationReadService = async (id: string) => {
  const notification = await notificationRepository.markAsRead(id);

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return notification;
};

export const deleteNotificationService = async (id: string) => {
  const notification = await notificationRepository.deleteNotification(id);

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }
};
