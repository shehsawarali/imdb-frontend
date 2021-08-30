import API from "./API";

const UserServices = {
  login: (credentials) => {
    return API.post("user/login/", credentials)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  verifyUser: (credentials) => {
    return API.get("user/session/")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },
};
export default UserServices;
