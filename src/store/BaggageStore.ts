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

  public baggages: IBaggages = [];

  public setBaggages(baggageList: IBaggages): void {
    this.baggages = baggageList;
  }

  public async getBaggageRequest<T extends IBaggage | number>(
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

  public async getBaggageById(
    ticketId: number
  ): Promise<void | IServerResponse> {
    try {
      const { data } = await BaggageService.getBaggageById(ticketId);
      this.setBaggages(data);
    } catch (e: unknown) {
      return handleServerError(e);
    }
  }

  public async createBaggage(baggage: IBaggage): Promise<IServerResponse> {
    return this.getBaggageRequest(baggage, BaggageService.createBaggage);
  }

  public async updateBaggage(baggage: IBaggage): Promise<IServerResponse> {
    return this.getBaggageRequest(baggage, BaggageService.updateBaggage);
  }

  public async deleteBaggage(id: number): Promise<IServerResponse> {
    return this.getBaggageRequest(id, BaggageService.deleteBaggage);
  }
}

export default new TicketStore();
