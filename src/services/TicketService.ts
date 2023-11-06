import $axios from "axios";
import type { AxiosResponse } from "axios";
import { IFlightResponse } from "../models/flights";
import { ITicket } from "../models/ticket";

class AuthService {
  public static async createTiket(
    ticket: ITicket
  ): Promise<AxiosResponse<IFlightResponse>> {
    return $axios.post("http://localhost:3001/tiket/create", ticket, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJUZXN0IE5hbWUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTI2NDU1NSwiZXhwIjoxNzA3MDQwNTU1fQ.nZcg60m2wapfyUL922QQPA2aJAlk1JEbq9WktSLAQ88",
      },
    });
  }
}

export default AuthService;
