import $axios from "../http";
import { AxiosResponse } from "axios";
import { ITicket, ITickets } from "../models/ticket";
import { ISuccess } from "../models/success";

class AuthService {
  public static async createTicket(
    ticket: ITicket
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.post("tiket/create", ticket);
  }

  public static getTickets(userId: number): Promise<AxiosResponse<ITickets>> {
    return $axios.post("tiket/get/all", userId);
  }
}

export default AuthService;
