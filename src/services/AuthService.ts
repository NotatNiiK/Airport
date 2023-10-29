import { RegData, AuthResponse } from "../models/auth";
import axios from "axios";
import type { AxiosResponse } from "axios";

class AuthServer {
  public static registration(
    registrationData: RegData
  ): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(
      `http://localhost:3001/logon`,
      registrationData
    );
  }
}

export default AuthServer;
