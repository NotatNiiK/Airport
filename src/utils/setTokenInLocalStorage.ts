function setTokenInLocalStorage(token: string): void {
  localStorage.setItem("token", JSON.stringify(token));
}

export default setTokenInLocalStorage;
