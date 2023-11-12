import $axios from "../http";
import { AxiosResponse } from "axios";
import { IBaggage, IBaggages } from "../models/baggage";
import { ISuccess } from "../models/success";

class BaggageService {
  static async getBaggageById(
    tiketId: number
  ): Promise<AxiosResponse<IBaggages>> {
    return $axios.post("get/by/tiket-id", { tiketId });
  }

  static async createBaggage(
    baggage: IBaggage
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.post("baggage/create", baggage);
  }

  static async updateBaggage(
    baggage: IBaggage
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.put("baggage/update", baggage);
  }

  public static async deleteBaggage(
    id: number
  ): Promise<AxiosResponse<ISuccess>> {
    return $axios.delete("baggage/delete", { data: { id } });
  }
}

export default BaggageService;
