import { Notification } from "../models/notification.model";
import { INotification } from "../interfaces/notification.interface";

export const createNotification = (
    data: Partial<INotification>
) => {
    return Notification.create(data);
};

export const getNotifications = (userId: string) => {
    return Notification.find({ user: userId }).sort({
        createdAt: -1,
    });
};

export const getNotificationById = (id: string) => {
    return Notification.findById(id);
};

export const updateNotification = (
    id: string,
    data: Partial<INotification>
) => {
    return Notification.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const markAsRead = (id: string) => {
    return Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
    );
};

export const deleteNotification = (id: string) => {
    return Notification.findByIdAndDelete(id);
};