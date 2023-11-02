import { FC, useEffect } from "react";
import cl from "./FlightsList.module.scss";
import FlightItem from "../FlightsItem/FlightsItem";
import { IFlight } from "../../models/flights";
import Loader from "../UI/Loader/Loader";

interface FlightsListProps {
  flights: IFlight[];
  isLoading: boolean;
}

const FlightsList: FC<FlightsListProps> = ({ flights, isLoading }) => {
  useEffect(() => {
    console.log("+");
  }, [isLoading]);

  return !isLoading ? (
    <ul className={cl["flights-list"]}>
      {flights.map((flight: IFlight) => (
        <FlightItem flight={flight} key={flight.id} />
      ))}
    </ul>
  ) : (
    <Loader />
  );
};

export default FlightsList;
