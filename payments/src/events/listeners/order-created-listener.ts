import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@ammarahmad/common";
import queueGroupName from "./queue-group-name";
import { OrderModel } from "../../models";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = OrderModel.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}

export default OrderCreatedListener;
