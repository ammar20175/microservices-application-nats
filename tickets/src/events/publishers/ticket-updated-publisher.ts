import { Publisher, Subjects, TicketUpdatedEvent } from "@ammarahmad/common";

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

export default TicketUpdatedPublisher;
