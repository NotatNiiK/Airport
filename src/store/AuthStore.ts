import { makeAutoObservable } from "mobx";
import { IAuthData, IRegData, IAuthCallback } from "../models/auth";
import { jwtDecode } from "jwt-decode";
import { IServerResponse } from "../models/server.response";
import { IToken } from "../models/token";
import { IServerError } from "../models/server.response";
import AuthService from "../services/AuthService";
import {
  setTokenInfoInLS,
  removeTokenInfoFromLS,
} from "../utils/tokenInfoInLocalStorage";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuth: boolean = false;
  isAdmin: boolean = true;

  tokenInfo: Partial<IToken> = {};

  setIsAuth(auth: boolean): void {
    this.isAuth = auth;
  }

  setTokenInfo(tokenDetails: IToken): void {
    this.tokenInfo = tokenDetails;
  }

  decodeToken(token: string) {
    const decodedToken: IToken = jwtDecode<IToken>(token);
    this.setTokenInfo(decodedToken);
    setTokenInfoInLS(token, this.tokenInfo);
  }

  async getAuthRequest<T extends IRegData | IAuthData>(
    reqData: T,
    callback: IAuthCallback<T>
  ): Promise<IServerResponse> {
    try {
      const {
        data: { access },
      } = await callback(reqData);

      this.decodeToken(access);
      this.setIsAuth(true);

      return {
        hasError: false,
        response: "Successfully completed",
      };
    } catch (e: unknown) {
      const error = e as IServerError;
      console.log(error);

      return {
        hasError: true,
        response: error.response?.data?.message || "Unexpected error",
      };
    }
  }

  async authorization(authData: IAuthData): Promise<IServerResponse> {
    return this.getAuthRequest(authData, AuthService.authorization);
  }

  async registration(regData: IRegData): Promise<IServerResponse> {
    return this.getAuthRequest(regData, AuthService.registration);
  }

  logout(): void {
    this.setIsAuth(false);
    removeTokenInfoFromLS();
  }
}

export default new AuthStore();
