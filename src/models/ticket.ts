export interface ITicket {
  arrivalTime: string;
  departureLocation: string;
  destination: string;
  classes: string;
  purchaseDate: string;
  cost: string;
  place: string;
  flightStatus: boolean;
  flightId: string;
  userId: string;
  flightNumber?: string;
  id?: number;
}

export type ITickets = ITicket[];
