import { AppError } from "../utils/AppError";

import {
  createSettings,
  getSettings,
  updateSettings,
} from "../repositories/settings.repository";

import {
  CreateSettingsInput,
  UpdateSettingsInput,
} from "../validators/settings.validator";

export const createSettingsService = async (data: CreateSettingsInput) => {
  const existingSettings = await getSettings();

  if (existingSettings) {
    throw new AppError("Settings already exist.", 400);
  }

  return await createSettings(data);
};

export const getSettingsService = async () => {
  const settings = await getSettings();

  if (!settings) {
    throw new AppError("Settings not found.", 404);
  }

  return settings;
};

export const updateSettingsService = async (data: UpdateSettingsInput) => {
  const settings = await getSettings();

  if (!settings) {
    throw new AppError("Settings not found.", 404);
  }

  return await updateSettings(data);
};
