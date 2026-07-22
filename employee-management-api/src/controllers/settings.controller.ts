import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { AppError } from "../utils/AppError";

import {
  createSettingsService,
  getSettingsService,
  updateSettingsService,
} from "../services/settings.service";

import {
  createSettingsSchema,
  updateSettingsSchema,
} from "../validators/settings.validator";

import { sendTestEmail } from "../services/mail.service";

// Create Settings (Admin Only)

export const createSettings = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createSettingsSchema.parse(req.body);

    const settings = await createSettingsService(data);

    res.status(201).json({
      success: true,

      message: "Settings created successfully",

      data: settings,
    });
  },
);

// Get Settings

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await getSettingsService();

  res.status(200).json({
    success: true,

    data: settings,
  });
});

// Update Settings

export const updateSettings = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updateSettingsSchema.parse(req.body);

    const settings = await updateSettingsService(data);

    res.status(200).json({
      success: true,

      message: "Settings updated successfully",

      data: settings,
    });
  },
);

export const testEmail = asyncHandler(async (req: Request, res: Response) => {
  const settings = await getSettingsService();

  const email = req.body.email;

  if (!email) {
    throw new AppError("Receiver email required", 400);
  }

  await sendTestEmail({
    smtpHost: settings.emailSettings.smtpHost,

    smtpPort: settings.emailSettings.smtpPort,

    secure: settings.emailSettings.secure,

    username: settings.emailSettings.username,

    password: settings.emailSettings.password,

    senderEmail: settings.emailSettings.senderEmail,

    senderName: settings.emailSettings.senderName,

    receiverEmail: email,
  });

  res.json({
    success: true,

    message: "Test email sent successfully",
  });
});
