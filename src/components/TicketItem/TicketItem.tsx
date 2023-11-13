import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ITicket } from "../../models/ticket";
import cl from "./TicketItem.module.scss";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import LuggageIcon from "@mui/icons-material/Luggage";

interface TicketItemProps {
  ticket: ITicket;
}

const TicketItem: FC<TicketItemProps> = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <li className={cl["ticket-item"]} key={ticket.id}>
      <div className={cl["ticket-item__content"]}>
        <h2 className={cl["ticket-item__direction"]}>
          {ticket.departureLocation} - {ticket.destination}
        </h2>
        <p className={cl["ticket-item__time"]}>
          Arrival at: {ticket.arrivalTime}
        </p>
        <ul className={cl["info-list"]}>
          <li className={cl["info-list__item"]}>Price: {ticket.cost}$</li>
          <li className={cl["info-list__item"]}>Class: {ticket.classes}</li>
          <li className={cl["info-list__item"]}>Place: {ticket.place}</li>
        </ul>
        <div className={cl["ticket-item__baggage"]}>
          <button
            onClick={() => navigate(`/baggage/${ticket.id}`)}
            className={cl["ticket-item__add-baggage"]}
            title="Add baggage"
          >
            <LuggageIcon sx={{ fontSize: "18px" }} />
          </button>
        </div>
      </div>
      <div className={cl["ticket-item__image"]}>
        <AirplaneTicketIcon />
      </div>
    </li>
  );
};

export default TicketItem;
