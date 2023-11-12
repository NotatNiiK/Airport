import { makeAutoObservable } from "mobx";
import { IBaggage, IBaggages } from "../models/baggage";
import { IReqCallback } from "../models/req.callback";
import { IServerResponse } from "../models/server.response";
import BaggageService from "../services/BaggageService";
import handleServerError from "../utils/handleServerError";

class TicketStore {
  constructor() {
    makeAutoObservable(this);
  }

  baggages: IBaggages = [];

  setBaggages(baggageList: IBaggages): void {
    this.baggages = baggageList;
  }

  async getBaggageRequest<T extends IBaggage | number>(
    reqData: T,
    callback: IReqCallback<T>
  ): Promise<IServerResponse> {
    try {
      const {
        data: { success },
      } = await callback(reqData);

      return {
        hasError: false,
        response: success,
      };
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  async getBaggageById(ticketId: number): Promise<void | IServerResponse> {
    try {
      const { data } = await BaggageService.getBaggageById(ticketId);
      this.setBaggages(data);
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  async createBaggage(baggage: IBaggage): Promise<IServerResponse> {
    return this.getBaggageRequest(baggage, BaggageService.createBaggage);
  }

  async updateBaggage(baggage: IBaggage): Promise<IServerResponse> {
    return this.getBaggageRequest(baggage, BaggageService.updateBaggage);
  }

  async deleteBaggage(id: number): Promise<IServerResponse> {
    return this.getBaggageRequest(id, BaggageService.deleteBaggage);
  }
}

export default new TicketStore();
