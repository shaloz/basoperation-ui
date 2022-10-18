import axios, { AxiosInstance } from "axios";

const apiClientNoAuth = axios.create({
  baseURL: "http://localhost:8080/base_operation/v1/api",
});

apiClientNoAuth.interceptors.request.use((config: any) => {
  return config;
});

export const axiosInstanceNoAuth = (): AxiosInstance => apiClientNoAuth;
