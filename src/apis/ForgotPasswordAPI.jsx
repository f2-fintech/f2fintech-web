import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const ForgotPasswordAPI = {
  sendOtp: async (email, cancel = false) => {
    try {
      const response = await axiosInstance.request({
        url: `/forgot-password/send-otp`,
        method: "POST",
        data: { email },
        signal: cancel
          ? cancelApiObject[ForgotPasswordAPI.sendOtp.name].handleRequestCancellation().signal
          : undefined,
      });
      return { success: true };
    } catch (error) {
      console.error("Error sending OTP:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to send OTP. Please try again." 
      };
    }
  },

  verifyOtp: async (email, otp, cancel = false) => {
    try {
      const response = await axiosInstance.request({
        url: `/forgot-password/verify-otp`,
        method: "POST",
        data: { email, otp },
        signal: cancel
          ? cancelApiObject[ForgotPasswordAPI.verifyOtp.name].handleRequestCancellation().signal
          : undefined,
      });
      return { success: true, customerId: response.data.data.customerId };
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to verify OTP. Please try again." 
      };
    }
  },
};

const cancelApiObject = defineCancelApiObject(ForgotPasswordAPI);
