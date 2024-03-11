import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@ammarahmad/common";
import { TicketModel } from "../../models";
import queueGroupName from "./queue-group-name";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = TicketModel.build({
      id,
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}

export default TicketCreatedListener;
