interface IFlightsResponse {
  success: string;
}
interface ICreateData {
  flightNumber: string;
  departureLocation: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  flightStatus: string;
}

export type { IFlightsResponse, ICreateData };
