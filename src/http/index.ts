import axios from "axios";
import { AxiosInstance } from "axios";
import isUserAuth from "../utils/isUserAuth";

const $axios: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

$axios.interceptors.request.use((config) => {
  const accessToken: string = isUserAuth();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default $axios;
