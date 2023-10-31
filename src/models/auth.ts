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

export type { IRegData, IAuthResponse, IAuthData };
