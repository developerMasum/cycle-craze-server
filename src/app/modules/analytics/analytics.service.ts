import orderModel from "../order/order.model";

const analyticsOrders = async () => {
  const orders = await orderModel.find().sort({ createdAt: -1 });

  const total = orders.length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthOrders = orders.filter((order) => {
    const date = new Date(order.createdAt);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const lastMonthOrders = orders.filter((order) => {
    const date = new Date(order.createdAt);
    return (
      date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
    );
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const lastMonthRevenue = lastMonthOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );
  const currentMonthRevenue = thisMonthOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  return {
    revenueData: {
      total: totalRevenue,
      lastMonthTotal: lastMonthRevenue,
      percentageChange:
        lastMonthRevenue === 0
          ? 100
          : ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100,
    },
    ordersData: {
      total,
      lastMonthTotal: lastMonthOrders.length,
      percentageChange:
        lastMonthOrders.length === 0
          ? 100
          : ((thisMonthOrders.length - lastMonthOrders.length) /
              lastMonthOrders.length) *
            100,
    },
    usersData: {
      total: new Set(orders.map((o) => o.user.email)).size,
      lastMonthTotal: new Set(lastMonthOrders.map((o) => o.user.email)).size,
      percentageChange:
        lastMonthOrders.length === 0
          ? 100
          : ((new Set(thisMonthOrders.map((o) => o.user.email)).size -
              new Set(lastMonthOrders.map((o) => o.user.email)).size) /
              new Set(lastMonthOrders.map((o) => o.user.email)).size) *
            100,
    },
  };
};
const getLast12MonthsAnalyticsData = async () => {
  const orders = await orderModel.find();

  const monthlyMap: Record<
    string,
    { orders: number; totalRevenue: number; users: Set<string> }
  > = {};

  for (const order of orders) {
    const date = new Date(order.createdAt);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (!monthlyMap[month]) {
      monthlyMap[month] = { orders: 0, totalRevenue: 0, users: new Set() };
    }

    monthlyMap[month].orders += 1;
    monthlyMap[month].totalRevenue += order.totalPrice;
    monthlyMap[month].users.add(order.user.email);
  }

  const sortedMonths = Object.keys(monthlyMap).sort().slice(-12);

  return {
    orders: sortedMonths.map((month) => ({
      month,
      orders: monthlyMap[month].orders,
    })),
    revenue: sortedMonths.map((month) => ({
      month,
      totalRevenue: monthlyMap[month].totalRevenue,
    })),
    users: sortedMonths.map((month) => ({
      month,
      users: monthlyMap[month].users.size,
    })),
  };
};
const getTopSellingProducts = async (filter?: {
  name: string;
  value: string;
}) => {
  const matchStage: any = {};

  if (filter?.name && filter?.value) {
    matchStage[`user.${filter.name}`] = filter.value;
  }

  const result = await orderModel.aggregate([
    { $match: matchStage },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.product",
        totalQuantitySold: { $sum: "$products.quantity" },
        totalRevenue: { $sum: "$totalPrice" },
        name: { $first: "$products.name" },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: {
        path: "$productDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        productId: "$_id",
        totalQuantitySold: 1,
        totalRevenue: 1,
        name: 1,
        images: "$productDetails.images",
        brand: "$productDetails.brand",
        price: "$productDetails.price",
      },
    },
  ]);

  return result;
};

export const AnalyticsService = {
  analyticsOrders,
  getLast12MonthsAnalyticsData,
  getTopSellingProducts,
};
