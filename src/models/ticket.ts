interface ITicket {
  id?: number;
  arrivalTime: string;
  departureLocation: string;
  destination: string;
  classes: string;
  purchaseDate: string;
  cost: string;
  place: string;
  flightStatus: boolean;
  flightNumber?: string;
  flightId: string;
  userId: string;
}

type ITickets = ITicket[];

export type { ITicket, ITickets };
