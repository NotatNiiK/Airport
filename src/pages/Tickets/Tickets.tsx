import { FC } from "react";
import { useParams } from "react-router-dom";

const Tickets: FC = () => {
  const { flightId } = useParams();
  return <h1>FlightID: {flightId} </h1>;
};

export default Tickets;
