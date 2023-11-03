import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IAuthData, IRegData } from "../models/auth";
import { jwtDecode } from "jwt-decode";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAdmin: boolean = true;

  decodeToken(token: string) {
    const access: any = jwtDecode(token);
    console.log(access);
  }

  async authorization(
    authData: IAuthData
  ): Promise<{ hasError: boolean; response: string }> {
    try {
      const {
        data: { access },
      } = await AuthService.authorization(authData);
      this.decodeToken(access);
      return {
        hasError: false,
        response: access,
      };
    } catch (e: any) {
      console.log(e);
      return {
        hasError: true,
        response: e?.response?.data?.message || "Unexpected error",
      };
    }
  }
  async registration(
    regData: IRegData
  ): Promise<{ hasError: boolean; response: string }> {
    try {
      const {
        data: { access },
      } = await AuthService.registration(regData);
      this.decodeToken(access);
      return {
        hasError: false,
        response: access,
      };
    } catch (e: any) {
      console.log(e);
      return {
        hasError: true,
        response: e?.response?.data?.message || "Unexpected error",
      };
    }
  }
  logout(): void {
    localStorage.removeItem("token");
  }
}

export default new AuthStore();
