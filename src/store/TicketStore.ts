import { makeAutoObservable } from "mobx";
import { ServerResponse } from "../models/server.response";
import TicketService from "../services/TicketService";
import { ITicket } from "../models/ticket";

class TicketStore {
  constructor() {
    makeAutoObservable(this);
  }
  async createTicket(ticket: ITicket): Promise<ServerResponse> {
    try {
      const {
        data: { success },
      } = await TicketService.createTiket(ticket);
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

export default new TicketStore();
