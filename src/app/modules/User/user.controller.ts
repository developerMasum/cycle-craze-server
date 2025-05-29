import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  console.log(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is created successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is fetched successfully",
    data: result,
  });
});
interface RequestWithUser extends Request {
  user: TUser;
}
const getMe = catchAsync(async (req, res) => {
  console.log(req);
  const user = (req as unknown as RequestWithUser).user;
  const result = await UserServices.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});
const userBlockUnblock = catchAsync(async (req, res) => {
  const result = await UserServices.userBlockUnblock(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User has been ${
      result.isBlock ? "blocked" : "unblocked"
    } successfully`,
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserServices.deleteUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getMe,
  userBlockUnblock,
  deleteUser,
};
