import { Announcement } from "../models/announcement.model";
import { IAnnouncement } from "../interfaces/announcement.interface";

export const createAnnouncement = (data: Partial<IAnnouncement>) => {
  return Announcement.create(data);
};

export const getAnnouncements = () => {
  return Announcement.find()
    .populate("createdBy", "firstName lastName")
    .sort({ createdAt: -1 });
};

export const getAnnouncementById = (id: string) => {
  return Announcement.findById(id).populate("createdBy", "firstName lastName");
};

export const updateAnnouncement = (
  id: string,
  data: Partial<IAnnouncement>,
) => {
  return Announcement.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteAnnouncement = (id: string) => {
  return Announcement.findByIdAndDelete(id);
};
