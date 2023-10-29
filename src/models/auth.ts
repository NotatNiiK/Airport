interface RegData {
  fullName: string;
  email: string;
  password: string;
  passportNumber: string;
  contactInfo: string;
}

interface AuthResponse {
  access: string;
}

export type { RegData, AuthResponse };
