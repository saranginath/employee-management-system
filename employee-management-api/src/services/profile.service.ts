import bcrypt from "bcrypt";

import {
  getUserProfileRepo,
  updateUserProfileRepo,
  updateProfilePictureRepo,
  findUserWithPasswordRepo,
  updatePasswordRepo,
} from "../repositories/profile.repository";

import { AppError } from "../utils/AppError";

// View Profile

export const getProfileService = async (userId: string) => {
  const user = await getUserProfileRepo(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Update Profile

export const updateProfileService = async (userId: string, data: any) => {
  const user = await updateUserProfileRepo(userId, data);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Upload Profile Picture

export const uploadProfilePictureService = async (
  userId: string,
  imagePath: string,
) => {
  const user = await updateProfilePictureRepo(userId, imagePath);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Change Password

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await findUserWithPasswordRepo(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new AppError("Current password is incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await updatePasswordRepo(userId, hashedPassword);

  return true;
};
