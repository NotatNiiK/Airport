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
      } = await TicketService.createTicket(ticket);
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
  async getTickets(userId: number): Promise<any> {
    try {
      const { data } = await TicketService.getTickets(userId);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default new TicketStore();
