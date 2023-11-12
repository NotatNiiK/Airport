import { FC } from "react";
import { ITickets } from "../../models/ticket";
import cl from "./TicketsList.module.scss";
import NotFound from "../UI/NotFound/NotFound";
import TicketItem from "../TicketItem/TicketItem";

interface TicketsListProps {
  ticketsList: ITickets;
}

const TicketsList: FC<TicketsListProps> = ({ ticketsList }) => {
  return ticketsList.length > 0 ? (
    <ul className={cl["ticket-list"]}>
      {ticketsList.map((ticket: any) => (
        <TicketItem ticket={ticket} />
      ))}
    </ul>
  ) : (
    <NotFound colorClass="text-white">There are no tickets</NotFound>
  );
};

export default TicketsList;
