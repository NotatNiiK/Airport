import { makeAutoObservable } from "mobx";
import { IAuthData, IRegData, IAuthCallback } from "../models/auth";
import { jwtDecode } from "jwt-decode";
import { IServerResponse } from "../models/server.response";
import { IToken } from "../models/token";
import AuthService from "../services/AuthService";
import {
  setTokenInfoInLS,
  removeTokenInfoFromLS,
} from "../utils/tokenInfoInLocalStorage";
import handleServerError from "../utils/handleServerError";

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
      return handleServerError(e);
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
