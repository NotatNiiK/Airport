import $axios from "../http";
import { AxiosResponse } from "axios";
import { IFlight, IFlights } from "../models/flights";
import { ISuccess } from "../models/success";

class FlightsService {
  public static async getFlights(): Promise<AxiosResponse<IFlights>> {
    return $axios.get(`flight/get/all`);
  }

  public static async createFlight(
    flight: IFlight
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.post(`flight/create`, flight);
  }

  public static async deleteFlight(
    id: number
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.delete("flight/delete", { data: { id } });
  }

  public static async updateFlight(
    flight: IFlight
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.put("flight/update", flight);
  }
}

export default FlightsService;
