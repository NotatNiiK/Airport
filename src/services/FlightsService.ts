import axios from "axios";
import { AxiosResponse } from "axios";
import { IFlightsResponse } from "../models/flights";

class FlightsService {
  public static async createFlight(): Promise<AxiosResponse<IFlightsResponse>> {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}flight/create`);
  }
}

export default FlightsService;
