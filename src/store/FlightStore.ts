import { makeAutoObservable } from "mobx";
import { IFlight, IFlights } from "../models/flight";
import { IReqCallback } from "../models/req.callback";
import { IServerResponse } from "../models/server.response";
import FlightService from "../services/FlightService";
import handleServerError from "../utils/handleServerError";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  public flightsList: IFlights = [];

  public setFlightsList(flights: IFlights): void {
    this.flightsList = flights;
  }

  public async getFlightRequest<T extends IFlight | number>(
    reqData: T,
    callback: IReqCallback<T>
  ): Promise<IServerResponse> {
    try {
      const {
        data: { success },
      } = await callback(reqData);

      return {
        hasError: false,
        response: success,
      };
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  public async getFlights(): Promise<void | IServerResponse> {
    try {
      const { data } = await FlightService.getFlights();
      this.setFlightsList(data);
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  public async createFlight(flight: IFlight): Promise<IServerResponse> {
    return this.getFlightRequest(flight, FlightService.createFlight);
  }

  public async deleteFlight(id: number): Promise<IServerResponse> {
    return this.getFlightRequest(id, FlightService.deleteFlight);
  }

  public async updateFlight(flight: IFlight): Promise<IServerResponse> {
    return this.getFlightRequest(flight, FlightService.updateFlight);
  }
}

export default new AuthStore();
