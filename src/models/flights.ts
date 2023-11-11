import { AxiosResponse } from "axios";
import { ISuccess } from "./success";

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

type IFlightCallback<T> = (flightData: T) => Promise<AxiosResponse<ISuccess>>;

export type { IFlight, IFlights, IFlightCallback };
