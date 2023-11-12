import { makeAutoObservable } from "mobx";
import { IServerResponse } from "../models/server.response";
import { ITicket, ITickets } from "../models/ticket";
import TicketService from "../services/TicketService";
import handleServerError from "../utils/handleServerError";

class TicketStore {
  constructor() {
    makeAutoObservable(this);
  }

  public ticketsList: ITickets = [];

  public setTicketsList(tickets: ITickets): void {
    this.ticketsList = tickets;
  }

  public async createTicket(ticket: ITicket): Promise<IServerResponse> {
    try {
      const {
        data: { success },
      } = await TicketService.createTicket(ticket);

      return {
        hasError: false,
        response: success,
      };
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  public async getTickets(userId: number): Promise<void | IServerResponse> {
    try {
      const { data } = await TicketService.getTickets(userId);
      this.setTicketsList(data);
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }
}

export default new TicketStore();
