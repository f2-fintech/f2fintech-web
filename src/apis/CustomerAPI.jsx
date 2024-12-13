/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CustomerAPI = {
  /** Login customer
   */
  login: async (loginInfo, cancel = false) => {
    return await axiosInstance.request({
      url: `/login`,
      method: "POST",
      data: loginInfo,
      signal: cancel
        ? cancelApiObject[this.login.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  /** Register customer */
  register: async (registerInfo, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-customer`,
      method: "POST",
      data: registerInfo,
      signal: cancel
        ? cancelApiObject[this.register.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  resetPassword: async (values, cancel = false) => {
    return await axiosInstance.request({
      url: `/reset-password`,
      method: "POST",
      data: values,
      signal: cancel
        ? cancelApiObject[this.resetPassword.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  getCustomerProfile: async (customerId, cancel = false) => {
    return await axiosInstance.request({
      url: `/get-customer-profile/${customerId}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[
            this.getCustomerProfile.name
          ].handleRequestCancellation().signal
        : undefined,
    });
  },

  updateCustomerProfile: async (newData) => {
    try {
      const response = await axiosInstance.request({
        url: `/update-customer-profile`,
        method: "POST",
        data: newData,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating customer profile:", error);
      throw error;
    }
  },
};

// defining the cancel API object for CustomerAPI
const cancelApiObject = defineCancelApiObject(CustomerAPI);
