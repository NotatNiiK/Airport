import axios from "axios";
import { AxiosResponse } from "axios";
import { IFlightsResponse } from "../models/flights";
import { ICreateData } from "../models/flights";

class FlightsService {
  public static async createFlight(
    flight: ICreateData
  ): Promise<AxiosResponse<IFlightsResponse>> {
    return axios.post(
      `${process.env.REACT_APP_SERVER_URL}flight/creates`,
      flight,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiLQrtGA0ZbQuSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NjA4NDA5LCJleHAiOjE3MDYzODQ0MDl9.q9WK0-NvgBvBsjj-FNuRo48yMYIUKKgqUQkvIYr3bSc",
        },
        withCredentials: true,
      }
    );
  }
}

export default FlightsService;
