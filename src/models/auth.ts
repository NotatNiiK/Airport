import { AxiosResponse } from "axios";

interface IRegData {
  fullName: string;
  email: string;
  password: string;
  passportNumber: string;
  contactInfo: string;
}

type IAuthData = Omit<IRegData, "fullName" | "passportNumber" | "contactInfo">;

interface IAuthResponse {
  access: string;
}

type IAuthCallback = (
  authData: IAuthData | IRegData
) => Promise<AxiosResponse<IAuthResponse>>;

export type { IRegData, IAuthResponse, IAuthData, IAuthCallback };
