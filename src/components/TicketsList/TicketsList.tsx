import { FC } from "react";
import { ITickets } from "../../models/ticket";
import cl from "./TicketsList.module.scss";
import TicketItem from "../TicketItem/TicketItem";
import NotFound from "../UI/NotFound/NotFound";
import Loader from "../UI/Loader/Loader";

interface TicketsListProps {
  ticketsList: ITickets;
  loading: boolean;
}

const TicketsList: FC<TicketsListProps> = ({ ticketsList, loading }) => {
  if (loading) {
    return <Loader />;
  }

  return ticketsList.length > 0 ? (
    <ul className={cl["ticket-list"]}>
      {ticketsList.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </ul>
  ) : (
    <NotFound colorClass="text-white">
      There are currently no purchased tickets
    </NotFound>
  );
};

export default TicketsList;
