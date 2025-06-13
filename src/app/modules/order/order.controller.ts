import { Request, Response } from "express";
import { orderService } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import { TUser } from "../User/user.interface";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
const createOrderController = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await orderService.createOrder(orderData);

    res.status(201).json({
      success: true,
      message:
        orderData.paymentMethod === "Cash On Delivery"
          ? "Order placed successfully with Cash on Delivery."
          : "Payment session created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: (error as Error).message,
    });
  }
};
const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const product = await orderService.getOrderById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order data retrieved successfully!",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err,
    });
  }
};
const getMyOrders = catchAsync(async (req, res) => {
  const user = req.params;
  // console.log(user);

  const result = await orderService.getMyOrders(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My order is retrieved successfully",
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrders(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All order is retrieved successfully",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const result = await orderService.updateOrderStatus(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Status is updated successfully",
    data: result,
  });
});
export const OrderController = {
  createOrderController,
  getOrderByIdController,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
