import $axios from "axios";
import type { AxiosResponse } from "axios";
import { ITicket, ITickets } from "../models/ticket";
import { ISuccess } from "../models/success";

class AuthService {
  public static async createTiket(
    ticket: ITicket
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.post("http://localhost:3001/tiket/create", ticket, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJUZXN0IE5hbWUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTI2NDU1NSwiZXhwIjoxNzA3MDQwNTU1fQ.nZcg60m2wapfyUL922QQPA2aJAlk1JEbq9WktSLAQ88",
      },
    });
  }
  public static getTickets(userId: number): Promise<AxiosResponse<ITickets>> {
    return $axios.post("http://localhost:3001/tiket/get/all", userId, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJUZXN0IE5hbWUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTI2NDU1NSwiZXhwIjoxNzA3MDQwNTU1fQ.nZcg60m2wapfyUL922QQPA2aJAlk1JEbq9WktSLAQ88",
      },
    });
  }
}

export default AuthService;
