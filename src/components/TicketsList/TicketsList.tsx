import { FC } from "react";
import { ITickets } from "../../models/ticket";

interface TicketsListProps {
  ticketsList: ITickets;
}

const TicketsList: FC<TicketsListProps> = ({ ticketsList }) => {
  return (
    <ul>
      {ticketsList.map((ticket) => (
        <li>{ticket.classes}</li>
      ))}
    </ul>
  );
};

export default TicketsList;
