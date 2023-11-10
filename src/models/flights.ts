interface IFlight {
  id?: number;
  flightNumber: string;
  departureLocation: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  flightStatus: string;
  price: number;
}

export type { IFlight };
