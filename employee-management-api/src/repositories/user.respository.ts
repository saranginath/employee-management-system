import { ClientSession } from "mongoose";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  return User.findOne({
    email,
  }).select("+password");
};

export const createUser = async (
  data: ICreateUser,
  session?: ClientSession,
) => {
  const user = await User.create([data], { session });

  return user[0];
};

export const updateRefreshToken = async (
  userId: string,
  refreshToken: string,
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      refreshToken,
    },
    {
      new: true,
    },
  );
};

export const findUserById = async (id: string) => {
  return User.findById(id).select("+password");
};

export const removeRefreshToken = async (id: string) => {
  return User.findByIdAndUpdate(
    id,
    {
      refreshToken: null,
    },
    {
      new: true,
    },
  );
};

export const updateChangePassword = async (
  userId: string,
  newPassword: string,
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      password: newPassword,
      isFirstLogin: false,
    },
    {
      new: true,
    },
  );
};

export const saveUser = async (user: IUser) => {
  return user.save();
};

export const findUserByResetToken = async (hashedToken: string) => {
  return User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: new Date(),
    },
  }).select("+passwordResetToken");
};

export const updatePassword = async (
  userId: string,
  hashedPassword: string,
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    },
    {
      new: true,
    },
  );
};
