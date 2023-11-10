import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IAuthData, IRegData, IAuthCallback } from "../models/auth";
import { jwtDecode } from "jwt-decode";
import { ServerResponse } from "../models/server.response";
import { IToken } from "../models/token";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuth = false;
  isAdmin: boolean = true;

  tokenInfo: Partial<IToken> = {};

  setIsAuth(auth: boolean): void {
    this.isAuth = auth;
  }

  decodeToken(token: string) {
    const decodedToken: IToken = jwtDecode<IToken>(token);
    this.tokenInfo = decodedToken;
    this.setIsAuth(true);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenInfo", JSON.stringify(this.tokenInfo));
  }

  async getAuthRequest<T extends IRegData | IAuthData>(
    data: T,
    callback: IAuthCallback<T>
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
    localStorage.removeItem("tokenInfo");
    this.setIsAuth(false);
  }
}

export default new AuthStore();
