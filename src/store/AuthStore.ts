import { makeAutoObservable } from "mobx";
import { IAuthData, IRegData, IAuthCallback } from "../models/auth";
import { IServerResponse } from "../models/server.response";
import { IToken } from "../models/token";
import { jwtDecode } from "jwt-decode";
import {
  setTokenInfoInStorage,
  removeTokenInfoFromStorage,
  setTokenInStorage,
} from "../utils/authTokenStorage";
import AuthService from "../services/AuthService";
import handleServerError from "../utils/handleServerError";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  public isAuth: boolean = false;
  public isAdmin: boolean = true;

  public tokenInfo: Partial<IToken> = {};

  public setIsAuth(auth: boolean): void {
    this.isAuth = auth;
  }

  public setTokenInfo(tokenDetails: IToken): void {
    this.tokenInfo = tokenDetails;
  }

  public decodeToken(token: string) {
    const decodedToken: IToken = jwtDecode<IToken>(token);
    this.setTokenInfo(decodedToken);
    setTokenInfoInStorage(this.tokenInfo);
    setTokenInStorage(token);
  }

  public async getAuthRequest<T extends IRegData | IAuthData>(
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

  public async authorization(authData: IAuthData): Promise<IServerResponse> {
    return this.getAuthRequest(authData, AuthService.authorization);
  }

  public async registration(regData: IRegData): Promise<IServerResponse> {
    return this.getAuthRequest(regData, AuthService.registration);
  }

  public logout(): void {
    this.setIsAuth(false);
    removeTokenInfoFromStorage();
  }
}

export default new AuthStore();
