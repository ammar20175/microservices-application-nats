import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@ammarahmad/common";

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

export default ExpirationCompletePublisher;
