import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IAuthData, IAuthResponse, IRegData } from "../models/auth";
import { jwtDecode } from "jwt-decode";
import { ServerResponse } from "../models/server.response";
import { AxiosResponse } from "axios";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAdmin: boolean = true;

  decodeToken(token: string) {
    const access: any = jwtDecode(token);
    console.log(access);
  }

  async getAuthRequest(
    data: IAuthData | IRegData,
    callback: (
      authData: IAuthData | IRegData
    ) => Promise<AxiosResponse<IAuthResponse>>
  ): Promise<ServerResponse> {
    try {
      const {
        data: { access },
      } = await callback(data);
      this.decodeToken(access);
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

  async authorization(authData: IAuthData): Promise<ServerResponse> {
    return this.getAuthRequest(authData, AuthService.authorization);
  }

  async registration(regData: IRegData): Promise<ServerResponse> {
    return this.getAuthRequest(regData, AuthService.registration);
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}

export default new AuthStore();
