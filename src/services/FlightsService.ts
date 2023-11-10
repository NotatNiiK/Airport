import $axios from "../http";
import { AxiosResponse } from "axios";
import { IFlight } from "../models/flights";
import { ISuccess } from "../models/success";

class FlightsService {
  public static async getFlights(): Promise<AxiosResponse<IFlight[]>> {
    return $axios.get<IFlight[]>(`flight/get/all`);
  }

  public static async createFlight(
    flight: IFlight
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.post<ISuccess>(`flight/create`, flight);
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
