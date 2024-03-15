import {
  OrderCancelledEvent,
  Subjects,
  Listener,
  OrderStatus,
} from "@ammarahmad/common";
import { Message } from "node-nats-streaming";
import queueGroupName from "./queue-group-name";
import { OrderModel } from "../../models";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await OrderModel.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}

export default OrderCancelledListener;
