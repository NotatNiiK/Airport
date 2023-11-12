import axios from "axios";
import type { AxiosResponse } from "axios";
import { IRegData, IAuthResponse, IAuthData } from "../models/auth";

class AuthService {
  private static async authRequest(
    url: string,
    reqData: IRegData | IAuthData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}${url}`, reqData);
  }

  public static async registration(
    regData: IRegData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return AuthService.authRequest("user/logon", regData);
  }

  public static async authorization(
    authData: IAuthData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return AuthService.authRequest("user/login", authData);
  }
}

export default AuthService;
