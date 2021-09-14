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

  profile: (id) => {
    return API.get(`user/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  update: (id, data) => {
    return API.put(`user/${id}/`, data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  follow: (id, data) => {
    return API.post(`user/follow/${id}/`, data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  unfollow: (id, data) => {
    return API.delete(`user/follow/${id}/`, data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  changePassword: (data) => {
    return API.put("user/change-email/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  followers: (id, page) => {
    return API.get(`user/${id}/followers/?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  following: (id, page) => {
    return API.get(`user/${id}/following/?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },
};

export default UserServices;
