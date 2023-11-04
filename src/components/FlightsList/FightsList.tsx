import { FC } from "react";
import cl from "./FlightsList.module.scss";
import FlightItem from "../FlightsItem/FlightsItem";
import { IFlight } from "../../models/flights";
import Loader from "../UI/Loader/Loader";
import BlockIcon from "@mui/icons-material/Block";

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
        <FlightItem flight={flight} key={flight.id} />
        /*   <Link to={`/tickets/${flight.id}/${AuthStore.tokenInfo.id}`}>
        </Link> */
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
