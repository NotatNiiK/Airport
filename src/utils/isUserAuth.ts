function isUserAuth(): string {
  return localStorage.getItem("token") || "";
}

export default isUserAuth;
