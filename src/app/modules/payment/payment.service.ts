import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log(verifyResponse);
  let result;
  if (verifyResponse && verifyResponse.pay_status === "successful") {
    result = await orderModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "Paid" }
    );
  }

  return `<h1>Payment ${status}!</h1>`;
};
export const paymentService = {
  confirmationService,
};
