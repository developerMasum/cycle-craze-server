import QueryBuilder from "../../utils/QueryBuilder";
import Product from "./product.model";
import { productSearchableFields } from "./product.utils";
const createProduct = async (data: any) => {
  return await Product.create(data);
};
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  // console.log(result);
  return {
    meta,
    result,
  };
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const productsService = {
  getAllProductsFromDB,
  getProductById,
  createProduct,
};
