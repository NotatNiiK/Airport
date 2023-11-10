import axios from "axios";
import type { AxiosResponse } from "axios";
import { IRegData, IAuthResponse, IAuthData } from "../models/auth";

class AuthService {
  private static async authRequest<T>(
    url: string,
    data: IRegData | IAuthData
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${process.env.REACT_APP_SERVER_URL}${url}`, data);
  }

  public static async registration(
    regData: IRegData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return AuthService.authRequest<IAuthResponse>("user/logon", regData);
  }

  public static async authorization(
    authData: IAuthData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return AuthService.authRequest<IAuthResponse>("user/login", authData);
  }
}

export default AuthService;
