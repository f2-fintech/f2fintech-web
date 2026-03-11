import axiosClient from "../api/apiClient";

export const SendQueryAPI = {
  create: async (data) => {
    return await axiosClient.request({
      url: `/send-query`,
      method: "POST",
      data: data,
    });
  },

  get: async (limit, offset) => {
    return await axiosClient.request({
      url: `/get-send-queries`,
      method: "GET",
      params: { limit: limit, offset: offset },
    });
  },
};
