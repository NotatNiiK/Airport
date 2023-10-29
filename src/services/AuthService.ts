import { RegData, AuthResponse } from "../models/auth";
import axios from "axios";
import type { AxiosResponse } from "axios";

class AuthServer {
  public static registration(
    registrationData: RegData
  ): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(
      `http://localhost:3001/user/logon`,
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
