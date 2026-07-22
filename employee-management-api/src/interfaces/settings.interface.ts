import { Document } from "mongoose";

export interface IWorkingHours {
  startTime: string;
  endTime: string;
  workingDays: string[];
  weeklyOff: string[];
  lateAfterMinutes: number;
}

export interface ILeavePolicy {
  casualLeave: number;
  sickLeave: number;
  earnedLeave: number;
  carryForward: boolean;
  maxCarryForward: number;
}

export interface INotificationSettings {
  email: boolean;
  push: boolean;
}

export interface IEmailSettings {
  smtpHost: string;
  smtpPort: number;
  secure: boolean;
  username: string;
  password: string;
  senderName: string;
  senderEmail: string;
}

export interface ISettings extends Document {
  companyName: string;
  companyLogo?: string;
  companyEmail?: string;
  companyPhone?: string;
  address?: string;

  currency: string;
  timezone: string;

  workingHours: IWorkingHours;

  leavePolicy: ILeavePolicy;

  notifications: INotificationSettings;

  emailSettings: IEmailSettings;

  createdAt: Date;
  updatedAt: Date;
}
