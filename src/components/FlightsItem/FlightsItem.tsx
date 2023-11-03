import { FC } from "react";
import cl from "./FlightsItem.module.scss";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import { IFlight } from "../../models/flights";
import { useFetching } from "../../hooks/useFetching";
import FlightsStore from "../../store/FlightsStore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const [deleteFlight] = useFetching(async (id: number) => {
    const r = await FlightsStore.deleteFlight(id);
    console.log(r.response);
    await FlightsStore.getFlights();
  });

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
        <div className={[cl["flights-item__buttons"]].join(" ")}>
          <DeleteIcon
            onClick={() => deleteFlight(flight.id)}
            className={[
              cl["flights-item__button"],
              cl["flights-item__button_delete"],
            ].join(" ")}
          />
          <EditIcon
            className={[
              cl["flights-item__button"],
              cl["flights-item__button_edit"],
            ].join(" ")}
          />
        </div>
      </div>
    </li>
  );
};

export default FlightItem;
