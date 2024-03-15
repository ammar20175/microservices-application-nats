import { Subjects, Publisher, PaymentCreatedEvent } from "@ammarahmad/common";

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

export default PaymentCreatedPublisher;
