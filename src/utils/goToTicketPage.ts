import { IFlight } from "../models/flights";

function gotoTicketPage(flight: IFlight, userId: number): string {
  return `tickets/${flight.id}/
  ${flight.flightNumber}/${flight.price}/${userId}/${flight.departureLocation}/${flight.destination}/${flight.arrivalTime}`;
}

export default gotoTicketPage;
