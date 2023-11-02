import $axios from "../http";
import { AxiosResponse } from "axios";
import { IFlightsResponse } from "../models/flights";
import { ICreateData } from "../models/flights";

class FlightsService {
  public static async createFlight(
    flight: ICreateData
  ): Promise<AxiosResponse<IFlightsResponse>> {
    return $axios.post(`flight/create`, flight);
  }
  public static async getFlights(): Promise<AxiosResponse<any>> {
    return $axios.get(`flight/get/all`);
  }
}

export default FlightsService;
