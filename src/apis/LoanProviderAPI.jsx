/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const LoanProviderAPI = {
  /** Login customer
   */
  getAll: async (limit = 100, cancel = false) => {
    return await axiosInstance.request({
      url: `/get-all-loan-providers?limit=${limit}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject["getAll"].handleRequestCancellation().signal
        : undefined,
    });
  },

  getCountryBasedProvider: async (country, cancel = false) => {
    return await axiosInstance.request({
      url: `/get-provider-by-country?country=${country}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject["getCountryBasedProvider"].handleRequestCancellation()
            .signal
        : undefined,
    });
  },
};

// defining the cancel API object for LoanProviderAPI
const cancelApiObject = defineCancelApiObject(LoanProviderAPI);
