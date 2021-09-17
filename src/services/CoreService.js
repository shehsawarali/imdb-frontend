import API from "services/API";

const CoreService = {
  title: (id) => {
    return API.get(`title/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  person: (id) => {
    return API.get(`person/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },
};

export default CoreService;