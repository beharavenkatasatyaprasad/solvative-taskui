import axios from "axios";
import { getConfig } from "../constants/config-handler";
import constants from "../constants";

const api = (method, url, data = null) => {
  return axios({
    method: method,
    url: `${getConfig().ROOT_URL}${url}`,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const addReview = (data) => {
  return api("post", constants.API.ADD, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteReview = (data) => {
  return api("post", constants.API.DELETE, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getReviewsOrReview = (data) => {
  return api("post", constants.API.READ, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateReview = (data) => {
  return api("post", constants.API.UPDATE, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
