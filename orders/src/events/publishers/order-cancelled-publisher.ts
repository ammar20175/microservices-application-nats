import { Publisher, Subjects, OrderCancelledEvent } from "@ammarahmad/common";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

export default OrderCancelledPublisher;
