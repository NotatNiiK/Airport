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

type IFlights = IFlight[];

export type { IFlight, IFlights };
