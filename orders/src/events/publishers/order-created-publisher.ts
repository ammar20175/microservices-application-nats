import { Publisher, Subjects, OrderCreatedEvent } from "@ammarahmad/common";

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

export default OrderCreatedPublisher;
