/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { IUser } from "@/interfaces/user";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export function getUserFromLS(): IUser | null {
  if (window.localStorage.getItem("userInfo")) {
    return JSON.parse(window.localStorage.getItem("userInfo")!);
  }
  return null;
}

export function setUserToLS(user: IUser) {
  window.localStorage.setItem("userInfo", JSON.stringify(user));
}

export function clearUserFromLS() {
  window.localStorage.removeItem("userInfo");
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function sendPostRequest(subPath: string, { arg }: any) {
  return axiosInstance.post(subPath, arg);
}

export async function sendPatchRequest(subPath: any, { arg }: any) {
  const { subUrl, payload } = arg;
  return axiosInstance.patch(`${subPath}${subUrl ?? ""}`, payload);
}

export async function sendDeleteRequest(subPath: any, { arg }: any) {
  return axiosInstance.delete(`${subPath}${arg}`);
}

export async function sendGetRequest(subPath: any, { arg }: any) {
  return axiosInstance.get(`${subPath}${arg}`);
}

axiosInstance.interceptors.request.use(
  (req) => {
    const token = getUserFromLS()?.token;
    if (token) {
      req.headers.Authorization = "Bearer " + token;
    }
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    // const headers = res.headers;
    // if (headers instanceof AxiosHeaders) {
    //   const updatedToken = headers.get("authToken");
    //   if (updatedToken) setToken(updatedToken as string);
    // }
    return res;
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);
