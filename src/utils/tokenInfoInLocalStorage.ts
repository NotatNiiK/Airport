import { IToken } from "../models/token";

export function setTokenInfoInLS(
  token: string,
  tokenInfo: Partial<IToken>
): void {
  localStorage.setItem("token", token);
  localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
}

export function removeTokenInfoFromLS(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenInfo");
}
