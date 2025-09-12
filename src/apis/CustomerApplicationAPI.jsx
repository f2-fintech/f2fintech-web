import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CustomerApplicationAPI = {
  // Function to create a loan application
  createApplication: async (document, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-application`,
      method: "POST",
      data: document,
      signal: cancel
        ? cancelApiObject[this.createApplication.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  // Function to get all Applications from the DB
  getApplications: async (cancel = false) => {
    return await axiosInstance.request({
      url: `/get-applications`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getApplications.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  // Function to get Application from the DB by customerId
  getApplicationById: async (customerId, cancel = false) => {
    return await axiosInstance.request({
      url: `/get-application-by-id/${customerId}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[
          this.getApplicationById.name
        ].handleRequestCancellation().signal
        : undefined,
    });
  },
  // Function to get Application from the DB by customerId
  getApplicationByIdWeb: async ( customerId, cancel = false ) => {
    return await axiosInstance.request( {
      url: `/get-application-by-id-web/${ customerId }`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[
          this.getApplicationById.name
        ].handleRequestCancellation().signal
        : undefined,
    } );
  }
};

const cancelApiObject = defineCancelApiObject(CustomerApplicationAPI);
