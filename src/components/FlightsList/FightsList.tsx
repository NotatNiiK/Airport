import { FC } from "react";
import cl from "./FlightsList.module.scss";
import FlightItem from "../FlightsItem/FlightsItem";
import { IFlight } from "../../models/flights";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader/Loader";

interface FlightsListProps {
  flights: IFlight[];
  isLoading: boolean;
}

const FlightsList: FC<FlightsListProps> = ({ flights, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return flights.length > 0 ? (
    <ul className={cl["flights-list"]}>
      {flights.map((flight: IFlight) => (
        <Link to={`/tickets/${flight.id}`}>
          <FlightItem flight={flight} key={flight.id} />
        </Link>
      ))}
    </ul>
  ) : (
    <h2 className={cl["not-found"]}>There are no flights!</h2>
  );
};

export default FlightsList;
