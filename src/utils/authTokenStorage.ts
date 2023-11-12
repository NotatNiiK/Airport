import { IToken } from "../models/token";

export function setTokenInStorage(token: string): void {
  localStorage.setItem("token", token);
}

export function setTokenInfoInStorage(tokenInfo: Partial<IToken>): void {
  localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
}

export function removeTokenInfoFromStorage(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenInfo");
}

export function isUserAuth(): string {
  return localStorage.getItem("token") || "";
}
