import { FC } from "react";
import { ITickets } from "../../models/ticket";
import cl from "./TicketsList.module.scss";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

interface TicketsListProps {
  ticketsList: ITickets;
}

const TicketsList: FC<TicketsListProps> = ({ ticketsList }) => {
  return (
    <ul className={cl["ticket-list"]}>
      {ticketsList.map((ticket) => (
        <li className={cl["ticket-item"]} key={ticket.id}>
          <div className={cl["ticket-item__content"]}>
            <h2 className={cl["ticket-item__direction"]}>London - Kyiv</h2>
            <p className={cl["ticket-item__info"]}>
              Bought: {ticket.purchaseDate}
            </p>
            <p className={cl["ticket-item__info"]}>Price: {ticket.cost}</p>
            <p className={cl["ticket-item__info"]}>Place: {ticket.place}</p>
          </div>
          <div className={cl["ticket-item__image"]}>
            <AirplaneTicketIcon />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TicketsList;
