import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IAuthData } from "../models/auth";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  async authorization(
    authData: IAuthData
  ): Promise<{ hasError: boolean; response: string }> {
    try {
      const {
        data: { access },
      } = await AuthService.authorization(authData);
      return {
        hasError: false,
        response: access,
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

export default new AuthStore();
