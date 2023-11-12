import { FC } from "react";
import { ITicket } from "../../models/ticket";
import cl from "./TicketItem.module.scss";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

interface TicketItemProps {
  ticket: ITicket;
}

const TicketItem: FC<TicketItemProps> = ({ ticket }) => {
  return (
    <li className={cl["ticket-item"]} key={ticket.id}>
      <div className={cl["ticket-item__content"]}>
        <h2 className={cl["ticket-item__direction"]}>London - Kyiv</h2>
        <p className={cl["ticket-item__time"]}>
          Arrival at: {ticket.purchaseDate}
        </p>
        <ul className={cl["info-list"]}>
          <li className={cl["info-list__item"]}>Price: {ticket.cost}$</li>
          <li className={cl["info-list__item"]}>Class: {ticket.classes}</li>
          <li className={cl["info-list__item"]}>Place: {ticket.place}</li>
        </ul>
      </div>
      <div className={cl["ticket-item__image"]}>
        <AirplaneTicketIcon />
      </div>
    </li>
  );
};

export default TicketItem;
