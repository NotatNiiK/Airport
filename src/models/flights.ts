interface IFlightResponse {
  success: string;
}
interface IFlight {
  id?: number;
  flightNumber: string;
  departureLocation: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  flightStatus: string;
}

export type { IFlightResponse, IFlight };
