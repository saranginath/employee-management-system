import { UpdateQuery } from "mongoose";
import { ISettings } from "../interfaces/settings.interface";
import { Settings } from "../models/settings.model";

export const createSettings = async (data: Partial<ISettings>) => {
  return await Settings.create(data);
};

export const getSettings = async () => {
  return await Settings.findOne();
};

export const updateSettings = async (data: UpdateQuery<ISettings>) => {
  return await Settings.findOneAndUpdate({}, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteSettings = async () => {
  return await Settings.findOneAndDelete();
};
