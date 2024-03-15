import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from "@ammarahmad/common";
import { Message } from "node-nats-streaming";
import queueGroupName from "./queue-group-name";
import { OrderModel } from "../../models";

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await OrderModel.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}

export default PaymentCreatedListener;
