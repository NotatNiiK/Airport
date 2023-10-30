import axios from "axios";
import type { AxiosResponse } from "axios";
import { IRegData, IAuthResponse } from "../models/auth";

class AuthServer {
  public static registration(
    registrationData: IRegData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return axios.post<IAuthResponse>(
      `${process.env.REACT_APP_SERVER_URL}user/logon`,
      registrationData,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiLQrtGA0ZbQuSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NjA4NDA5LCJleHAiOjE3MDYzODQ0MDl9.q9WK0-NvgBvBsjj-FNuRo48yMYIUKKgqUQkvIYr3bSc",
        },
        withCredentials: true,
      }
    );
  }
}

export default AuthServer;
