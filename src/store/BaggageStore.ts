import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { IBaggage, IBaggages } from "../models/baggage";
import { ISuccess } from "../models/success";
import { IServerResponse } from "../models/server.response";
import handleServerError from "../utils/handleServerError";
import BaggageService from "../services/BaggageService";

type IBaggageCallback<T> = (data: T) => Promise<AxiosResponse<ISuccess>>;

class TicketStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getBaggageRequest<T extends IBaggage | number>(
    reqData: T,
    callback: IBaggageCallback<T>
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
      console.log(data);
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
