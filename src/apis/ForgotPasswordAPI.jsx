import { auth } from "./config/firebaseConfig";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

export const ForgotPasswordAPI = {
  sendOtp: async (contact, appVerifier) => {
    try {
      // Send OTP using Firebase
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        contact,
        appVerifier
      );

      // Return the verificationId for OTP verification
      return {
        success: true,
        verificationId: confirmationResult.verificationId,
      };
    } catch (error) {
      console.error("Error sending OTP:", error);

      let errorMessage;
      if (error.code === "auth/invalid-phone-number") {
        errorMessage = "Invalid phone number. Please provide a valid one.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many attempts. Please wait a while before requesting again.";
      } else {
        errorMessage = "Failed to send OTP. Please try again.";
      }

      return { success: false, error: errorMessage };
    }
  },

  verifyOtp: async (verificationId, otp) => {
    try {
      if (!verificationId || !otp) {
        console.log("Verification ID or OTP is missing.", verificationId, otp);
      }

      const credential = PhoneAuthProvider.credential(verificationId, otp);

      // Sign in with the credential
      await signInWithCredential(auth, credential);

      return { success: true, message: "OTP verified successfully!" };
    } catch (error) {
      console.error("Error verifying OTPPPPP:", error);
      //   console.log("Error details:", JSON.stringify(error));

      let errorMessage;
      switch (error.code) {
        case "auth/invalid-verification-code":
          errorMessage = "Invalid OTP. Please try again.";
          break;
        case "auth/code-expired":
          errorMessage = "OTP has expired. Please request a new one.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please wait before trying again.";
          break;
        default:
          errorMessage = "Failed to verify OTP. Please try again.";
          break;
      }

      return { success: false, error: errorMessage };
    }
  },
};
