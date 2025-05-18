import { Request, Response } from "express";
import { productsService } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
const createProductController = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const product = await productsService.createProduct(data);
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
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
const getAllProductsHandler = catchAsync(async (req, res) => {
  const result = await productsService.getAllProductsFromDB(req.query);
  // console.log(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "products are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getProductByIdHandler = async (req: Request, res: Response) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product data retrived successfully!",
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

export const productsController = {
  getAllProductsHandler,
  getProductByIdHandler,
  createProductController,
};
