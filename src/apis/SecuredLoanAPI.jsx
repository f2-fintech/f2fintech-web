import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const SecuredLoanAPI = {
  // Function to create a secured loan lead
  // NOTE: Do NOT manually set Content-Type here.
  // When data is FormData, axios automatically sets:
  // Content-Type: multipart/form-data; boundary=----XXXXXXXX
  // If we set it manually, the boundary is missing and the server crashes.
  submitLead: async (formPayload, cancel = false) => {
    return await axiosInstance.request({
      url: `/secured-loan`,
      method: "POST",
      data: formPayload,
      signal: cancel
        ? cancelApiObject[this.submitLead.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

const cancelApiObject = defineCancelApiObject(SecuredLoanAPI);
