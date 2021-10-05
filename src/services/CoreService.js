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

  titleSearch: (queryParams) => {
    return API.get(`search/title/?${queryParams}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  personSearch: (queryParams) => {
    return API.get(`search/person/?${queryParams}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  watchlist: (page) => {
    return API.get(`get-watchlist/?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  addToWatchlist: (id) => {
    return API.post(`/watchlist/`, { id })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  removeFromWatchlist: (id) => {
    return API.delete(`watchlist/?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  isWatchlisted: (id) => {
    return API.get(`watchlist/?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  favorites: (page) => {
    return API.get(`get-favorites/?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  addToFavorites: (id) => {
    return API.post(`/favorite/`, { id })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  removeFromFavorites: (id) => {
    return API.delete(`favorite/?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  isFavorited: (id) => {
    return API.get(`favorite/?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  getReviews: (id, page) => {
    return API.get(`reviews/${id}/?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  rate: (data) => {
    return API.post("rate/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  isRated: (id) => {
    return API.get(`rate/?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  isReviewed: (id) => {
    return API.get(`review/?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  review: (data) => {
    return API.post("review/", data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  timeline: (page) => {
    return API.get(`timeline/?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  recommendations: () => {
    return API.get("recommendations/")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },

  topRated: () => {
    return API.get("top_rated/")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  },
};

export default CoreService;
