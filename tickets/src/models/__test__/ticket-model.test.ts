import TicketModel from "../ticket-model";

it("implements optimistic concurrency control", async () => {
  const ticket = TicketModel.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  const firstInstance = await TicketModel.findById(ticket.id);
  const secondInstance = await TicketModel.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point");
});
