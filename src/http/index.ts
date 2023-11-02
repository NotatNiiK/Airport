import axios from "axios";
import type { AxiosInstance } from "axios";

const $axios: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

$axios.interceptors.request.use((config) => {
  const accessToken: string = JSON.parse(localStorage.getItem("token") || "");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default $axios;
