import { makeAutoObservable } from "mobx";
import FlightService from "../services/FlightService";
import { IFlight } from "../models/flights";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  flightsList: IFlight[] = [];

  async getFlights() {
    try {
      const data = await FlightService.getFlights();
      this.flightsList = data.data;
      return {
        hasError: false,
        response: data.data,
      };
    } catch (e: any) {
      console.log(e);
      return {
        hasError: true,
        response: e?.response?.data?.message || "Unexpected error",
      };
    }
  }

  async createFlight(
    flight: IFlight
  ): Promise<{ hasError: boolean; response: string }> {
    try {
      const {
        data: { success },
      } = await FlightService.createFlight(flight);
      return {
        hasError: false,
        response: success,
      };
    } catch (e: any) {
      console.log(e);
      return {
        hasError: true,
        response: e?.response?.data?.message || "Unexpected error",
      };
    }
  }

  async deleteFlight(
    id: number
  ): Promise<{ hasError: boolean; response: string }> {
    try {
      const {
        data: { success },
      } = await FlightService.deleteFlight(id);
      return {
        hasError: false,
        response: success,
      };
    } catch (e: any) {
      console.log(e);
      return {
        hasError: true,
        response: e?.response?.data?.message || "Unexpected error",
      };
    }
  }

  async updateFlight(
    flight: IFlight
  ): Promise<{ hasError: boolean; response: string }> {
    try {
      const {
        data: { success },
      } = await FlightService.updateFlight(flight);
      return {
        hasError: false,
        response: success,
      };
    } catch (e: any) {
      console.log(e);
      return {
        hasError: true,
        response: e?.response?.data?.message || "Unexpected error",
      };
    }
  }
}

export default new AuthStore();
