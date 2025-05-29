/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";

import { TUser } from "./user.interface";
import { User } from "./user.model";

import { DashboardData } from "./user.constant";
import AppError from "../../errors/AppError";

const createUserIntoDB = async (payload: TUser) => {
  console.log(payload);
  // console.log({payload})
  const isExistUser = await User.findOne({ email: payload.email });

  if (isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email already exists");
  }

  const result = await User.create(payload);
  return result;
};
const getAllUser = async () => {
  const result = await User.find().sort({ createdAt: -1 });
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return result;
};

const getMe = async (user: TUser) => {
  console.log(user);
  const result = await User.findOne({ email: user?.email, role: user?.role });
  return result;
};
const userBlockUnblock = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isBlock: !user.isBlock },
    { new: true } // return the updated document
  );

  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  getAllUser,
  getMe,
  deleteUser,
  userBlockUnblock,
};
