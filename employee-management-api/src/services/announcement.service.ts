import * as announcementRepository from "../repositories/announcement.repository";
import { AppError } from "../utils/AppError";

export const createAnnouncementService = (data: any) => {
    return announcementRepository.createAnnouncement(data);
};

export const getAnnouncementsService = () => {
    return announcementRepository.getAnnouncements();
};

export const getAnnouncementByIdService = async (
    id: string
) => {
    const announcement =
        await announcementRepository.getAnnouncementById(id);

    if (!announcement) {
        throw new AppError("Announcement not found", 404);
    }

    return announcement;
};

export const updateAnnouncementService = async (
    id: string,
    data: any
) => {
    const announcement =
        await announcementRepository.updateAnnouncement(id, data);

    if (!announcement) {
        throw new AppError("Announcement not found", 404);
    }

    return announcement;
};

export const deleteAnnouncementService = async (
    id: string
) => {
    const announcement =
        await announcementRepository.deleteAnnouncement(id);

    if (!announcement) {
        throw new AppError("Announcement not found", 404);
    }
};