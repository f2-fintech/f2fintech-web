/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CustomerInfoAPI = {
  /** Dump customer information */
  create: async (customerData, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-customer-info`,
      method: "POST",
      data: customerData,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
  /** Get customer information */
  getCustomerInfo: async (customerId, cancel = false) => {
    return await axiosInstance.request({
      url: `/customer-info/${customerId}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getCustomerInfo.name].handleRequestCancellation()
            .signal
        : undefined,
    });
  },

  /** Update customer information */
  updateCustomerInfo: async (data, cancel = false) => {
    return await axiosInstance.request({
      url: `/customer-info-update`,
      method: "PATCH",
      data: data,
      signal: cancel
        ? cancelApiObject[
            this.updateCustomerInfo.name
          ].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// Defining the cancel API object for CustomerInfoAPI
const cancelApiObject = defineCancelApiObject(CustomerInfoAPI);
