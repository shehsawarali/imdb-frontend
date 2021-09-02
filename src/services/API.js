import axios from "axios";

import { BACKEND_URL, JWT_PREFIX } from "constant";

const API = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `${JWT_PREFIX} ` + localStorage.getItem("access_token")
      : null,
  },
});

API.interceptors.response.use(
  function (response) {
    response.data.status = response.status;
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error?.response?.data?.code === "token_not_valid" &&
      originalRequest.url === "user/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (error?.response?.data?.code === "token_not_valid") {
      const refreshToken = localStorage.getItem("refresh_token");

      return API.post("user/token/refresh/", { refresh: refreshToken })
        .then((response) => {
          const accessToken = response.data.access;
          localStorage.setItem("access_token", accessToken);
          API.defaults.headers["Authorization"] = "Bearer " + accessToken;
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;

          return API(originalRequest);
        })
        .catch((error) => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login/";
        });
    }

    if (error.response) {
      return Promise.reject(error.response);
    }

    let errorInfo = {
      status: 500,
      data: {
        message: "Unable to execute request. Please try again.",
      },
    };

    return Promise.reject(errorInfo);
  }
);

export default API;
