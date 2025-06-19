import QueryBuilder from "../../utils/QueryBuilder";
import Product from "./product.model";
import { productSearchableFields } from "./product.utils";
const createProduct = async (data: any) => {
  return await Product.create(data);
};
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const allowedSortFields = ["price", "-price", "name", "-name"];
  let sortBy = query.sort as string;

  if (!allowedSortFields.includes(sortBy)) {
    sortBy = "-createdAt";
  }

  const priceRange = query.priceRange as string;
  const priceFilter: Record<string, number> = {};

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    if (!isNaN(min)) priceFilter.$gte = min;
    if (!isNaN(max)) priceFilter.$lte = max;
  }

  const filteredQuery = { ...query };
  delete filteredQuery.sort;
  delete filteredQuery.priceRange;

  const productQuery = new QueryBuilder(
    Product.find({
      ...(Object.keys(priceFilter).length ? { price: priceFilter } : {}),
    }),
    filteredQuery
  )
    .search(productSearchableFields)
    .filter()
    .paginate()
    .fields();

  productQuery.modelQuery = productQuery.modelQuery.sort(sortBy);

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};
const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
export const productsService = {
  getAllProductsFromDB,
  getProductById,
  createProduct,
  deleteProduct,
};
