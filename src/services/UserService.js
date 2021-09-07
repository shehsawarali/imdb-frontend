import API from "services/API";

const UserServices = {
  login: (data) => {
    return API.post("user/login/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  verifySession: () => {
    return API.get("user/session/")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  register: (data) => {
    return API.post("user/register/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  verifyAccount: (data) => {
    return API.post("user/verify/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  forgotPassword: (data) => {
    return API.post("user/forgot-password/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  checkPasswordResetLink: (data) => {
    return API.post("user/reset-password/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  resetPassword: (data) => {
    return API.put("user/reset-password/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  logOut: (data) => {
    return API.post("user/logout/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },
};

export default UserServices;
