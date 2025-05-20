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
  const result = await User.find();
  return result;
};

const getMe = async (user: TUser) => {
  // console.log(user)
  const result = await User.findOne({ email: user?.email, role: user?.role });
  // let result = null;
  // if (role === 'student') {
  //   result = await Student.findOne({ id: userId }).populate('user');
  // }
  // if (role === 'admin') {
  //   result = await Admin.findOne({ id: userId }).populate('user');
  // }

  // if (role === 'faculty') {
  //   result = await Faculty.findOne({ id: userId }).populate('user');
  // }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUser,
  getMe,
};
