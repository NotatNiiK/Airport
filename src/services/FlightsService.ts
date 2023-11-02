import $axios from "../http";
import { AxiosResponse } from "axios";
import { IFlightResponse, IFlight } from "../models/flights";

class FlightsService {
  public static async getFlights(): Promise<AxiosResponse<IFlight[]>> {
    return $axios.get<IFlight[]>(`flight/get/all`);
  }

  public static async createFlight(
    flight: IFlight
  ): Promise<AxiosResponse<IFlightResponse>> {
    return $axios.post<IFlightResponse>(`flight/create`, flight);
  }

  public static async deleteFlight(
    id: number
  ): Promise<AxiosResponse<IFlightResponse>> {
    return $axios.delete("flight/delete", { params: { id } });
  }
}

export default FlightsService;
