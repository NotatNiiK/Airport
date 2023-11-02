import { FC } from "react";
import cl from "./FlightsItem.module.scss";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import { IFlight } from "../../models/flights";

interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  return (
    <li className={cl["flights-item"]}>
      <div className={cl["flights-item__image"]}>
        <FlightTakeoffTwoToneIcon />
      </div>
      <div className={cl["flights-item__content"]}>
        <h3 className={cl["flights-item__departure-location"]}>
          {flight.departureLocation}
        </h3>
        <h3 className={cl["flights-item__destination"]}>
          from {flight.destination}
        </h3>
        <p className={cl["flights-item__time"]}>
          {flight.departureTime} - {flight.arrivalTime}
        </p>
        <p className={cl["flights-item__number"]}>
          Flight number: {flight.flightNumber}
        </p>
      </div>
    </li>
  );
};

export default FlightItem;
