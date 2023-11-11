import { FC } from "react";
import { IFlights } from "../../models/flights";
import cl from "./FlightsList.module.scss";
import FlightItem from "../FlightsItem/FlightsItem";
import Loader from "../UI/Loader/Loader";
import BlockIcon from "@mui/icons-material/Block";

interface FlightsListProps {
  flights: IFlights;
  isLoading: boolean;
}

const FlightsList: FC<FlightsListProps> = ({ flights, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return flights.length > 0 ? (
    <ul className={cl["flights-list"]}>
      {flights.map((flight) => (
        <FlightItem flight={flight} key={flight.id} />
      ))}
    </ul>
  ) : (
    <div className={cl["not-found"]}>
      <BlockIcon
        sx={{
          fontSize: "120px",
        }}
      />
      <h2 className={cl["not-found__title"]}>There are no flights!</h2>
    </div>
  );
};

export default FlightsList;
