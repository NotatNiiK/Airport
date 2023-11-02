import { makeAutoObservable } from "mobx";
import FlightsService from "../services/FlightsService";
import { ICreateData } from "../models/flights";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  async createFlight(
    flight: ICreateData
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
}

export default new AuthStore();
