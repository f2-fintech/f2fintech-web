/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const DocumentAPI = {
  // create the document in db
  createDocument: async (document, cancel = false) => {
    return await axiosInstance.request({
      url: `create-document`,
      method: "POST",
      data: document,
      signal: cancel
        ? cancelApiObject[this.createDocument.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  // upload the image to nodejs
  uploadDocument: async (document, cancel = false) => {
    return await axiosInstance.request({
      url: `upload-to-s3`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: document,
      signal: cancel
        ? cancelApiObject[this.uploadDocument.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  getCustomerDocuments: async (customerId, cancel = false) => {
    return await axiosInstance.request({
      url: `get-customer-document/${customerId}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getCustomerDocuments.name].handleRequestCancellation().signal
        : undefined,
    });
  }
};

// Defining the cancel API object for DocumentAPI
const cancelApiObject = defineCancelApiObject(DocumentAPI);
