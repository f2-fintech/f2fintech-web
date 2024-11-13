import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

const ForgotPasswordAPI = {
  sendOtp: async (contact, cancel = false) => {
    return await axiosInstance.request({
      url: `/send-otp`,
      method: "POST",
      data: { contact },
      signal: cancel
        ? cancelApiObject[ForgotPasswordAPI.sendOtp.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// Define the cancelApiObject for ForgotPasswordAPI
const cancelApiObject = defineCancelApiObject(ForgotPasswordAPI);

export default ForgotPasswordAPI;
