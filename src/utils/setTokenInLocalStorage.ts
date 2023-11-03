const setTokenInLocalStorage = (token: string): void => {
  localStorage.setItem("token", token);
};

export default setTokenInLocalStorage;
