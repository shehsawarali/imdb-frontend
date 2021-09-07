import axios from "axios";

import { ACCESS_TOKEN, BACKEND_URL, JWT_PREFIX, REFRESH_TOKEN } from "constant";

const API = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem(ACCESS_TOKEN)
      ? `${JWT_PREFIX} ` + localStorage.getItem(ACCESS_TOKEN)
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
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      return API.post("user/token/refresh/", { refresh: refreshToken })
        .then((response) => {
          const accessToken = response.data.access;
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          API.defaults.headers["Authorization"] = `${JWT_PREFIX} ` + accessToken;
          originalRequest.headers["Authorization"] = `${JWT_PREFIX} ` + accessToken;

          return API(originalRequest);
        })
        .catch((error) => {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
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
