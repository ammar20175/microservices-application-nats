import { Publisher, Subjects, TicketCreatedEvent } from "@ammarahmad/common";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;
