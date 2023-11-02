import { makeAutoObservable } from "mobx";
import FlightsService from "../services/FlightsService";
import { IFlight } from "../models/flights";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getFlights() {
    try {
      const data = await FlightsService.getFlights();
      console.log(data);
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
      } = await FlightsService.createFlight(flight);
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
      } = await FlightsService.deleteFlight(id);
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
