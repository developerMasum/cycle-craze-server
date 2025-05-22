import initiatePayment from "../payment/payment.utils";
import Product from "../product/product.model";
import Order from "./order.model";

// -- you can tighten up the type here if you like
interface OrderInput {
  name: string;
  email: string;
  contact: string;
  address: string;
  deliveryCharge: number;
  paymentMethod: "Cash On Delivery" | "Online Payment";
  products: Array<{
    product: string; // ObjectId as string
    quantity: number;
    name?: string; // optional, if you want to save the product name snapshot
  }>;
}

const createOrder = async (orderData: OrderInput) => {
  const {
    name,
    email,
    contact,
    address,
    paymentMethod,
    products,
    deliveryCharge,
  } = orderData;

  // 1️⃣ Re-calc totalPrice on the server
  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const p = await Product.findById(item.product);
      if (!p) throw new Error(`Product ${item.product} not found`);
      totalPrice += p.price * item.quantity;
      return {
        product: p._id,
        quantity: item.quantity,
        // store name snapshot if you like:
        name: p.name,
      };
    })
  );

  // 2️⃣ Build the order
  const transactionId = `TXN-${Date.now()}`;
  const order = new Order({
    user: {
      name,
      email,
      phone: contact,
      address,
    },
    products: productDetails,
    totalPrice,
    deliveryCharge,
    paymentMethod,
    status: "Pending",
    paymentStatus: "Pending",
    transactionId,
  });

  // 3️⃣ Save it
  await order.save();

  // 4️⃣ If COD, we’re done
  if (paymentMethod === "Cash On Delivery") {
    // you might want to send a confirmation email here
    return order;
  }

  // 5️⃣ Otherwise, spin up a payment session
  const paymentSession = await initiatePayment({
    totalPrice,
    transactionId,
    name,
    email,
    phone: contact,
    address,
  });

  return paymentSession;
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id).populate("products.product");
  return order;
};

export const orderService = {
  createOrder,
  getOrderById,
};
