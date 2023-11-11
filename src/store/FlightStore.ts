import { makeAutoObservable } from "mobx";
import { IFlight, IFlights, IFlightCallback } from "../models/flights";
import { IServerResponse } from "../models/server.response";
import FlightService from "../services/FlightService";
import handleServerError from "../utils/handleServerError";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  flightsList: IFlights = [];

  setFlightsList(flights: IFlights): void {
    this.flightsList = flights;
  }

  async getFlights(): Promise<void | IServerResponse> {
    try {
      const { data } = await FlightService.getFlights();
      this.setFlightsList(data);
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  async getFlightRequest<T extends IFlight | number>(
    data: T,
    callback: IFlightCallback<T>
  ): Promise<IServerResponse> {
    try {
      const {
        data: { success },
      } = await callback(data);

      return {
        hasError: false,
        response: success,
      };
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  async createFlight(flight: IFlight): Promise<IServerResponse> {
    return this.getFlightRequest(flight, FlightService.createFlight);
  }

  async deleteFlight(id: number): Promise<IServerResponse> {
    return this.getFlightRequest(id, FlightService.deleteFlight);
  }

  async updateFlight(flight: IFlight): Promise<IServerResponse> {
    return this.getFlightRequest(flight, FlightService.updateFlight);
  }
}

export default new AuthStore();
