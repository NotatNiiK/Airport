import { AxiosResponse } from "axios";

export interface IRegData {
  fullName: string;
  email: string;
  password: string;
  passportNumber: string;
  contactInfo: string;
}

export type IAuthData = Omit<
  IRegData,
  "fullName" | "passportNumber" | "contactInfo"
>;

export interface IAuthResponse {
  access: string;
}

export type IAuthCallback<T> = (
  authData: T
) => Promise<AxiosResponse<IAuthResponse>>;
