/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 */

import { axiosInstance } from "./config/axiosConfig";

export const LoanInquiryAPI = {
  create: async (data) => {
    return await axiosInstance.request({
      url: `/create-loan-inquiry`,
      method: "POST",
      data,
    });
  },

  getAll: async () => {
    return await axiosInstance.request({
      url: `/get-loan-inquiries`,
      method: "GET",
    });
  },
};
