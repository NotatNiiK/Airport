import axios from "axios";
import type { AxiosResponse } from "axios";
import { IRegData, IAuthResponse, IAuthData } from "../models/auth";

class AuthService {
  public static registration(
    regData: IRegData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return axios.post<IAuthResponse>(
      `${process.env.REACT_APP_SERVER_URL}user/logon`,
      regData
    );
  }
  public static authorization(
    authData: IAuthData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return axios.post<IAuthResponse>(
      `${process.env.REACT_APP_SERVER_URL}user/login`,
      authData
    );
  }
}

export default AuthService;
