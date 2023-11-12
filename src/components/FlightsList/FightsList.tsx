import { FC } from "react";
import { IFlights } from "../../models/flight";
import cl from "./FlightsList.module.scss";
import FlightItem from "../FlightsItem/FlightsItem";
import Loader from "../UI/Loader/Loader";
import NotFound from "../UI/NotFound/NotFound";

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
    <NotFound colorClass="text-custom-green">There are no flights!</NotFound>
  );
};

export default FlightsList;
