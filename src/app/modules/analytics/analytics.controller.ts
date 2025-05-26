import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const analyticsOrders = catchAsync(async (req, res) => {
  const result = await AnalyticsService.analyticsOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "analyzeOrders is retrieved successfully",
    data: result,
  });
});
const getLast12MonthsAnalyticsData = catchAsync(async (req, res) => {
  const result = await AnalyticsService.getLast12MonthsAnalyticsData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "12 months analytics data is retrieved successfully",
    data: result,
  });
});
const getTopSellingProducts = catchAsync(async (req, res) => {
  const result = await AnalyticsService.getTopSellingProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Top selling products is retrieved successfully",
    data: result,
  });
});

export const analyticsControllers = {
  analyticsOrders,
  getLast12MonthsAnalyticsData,
  getTopSellingProducts,
};
