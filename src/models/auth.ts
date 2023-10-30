interface IRegData {
  fullName: string;
  email: string;
  password: string;
  passportNumber: string;
  contactInfo: string;
}

interface IAuthResponse {
  access: string;
}

export type { IRegData, IAuthResponse };
