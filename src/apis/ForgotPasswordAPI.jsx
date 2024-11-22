// import { axiosInstance } from "./config/axiosConfig";
// import firebase from "firebase/app";
// import "firebase/auth";

// // Initialize Firebase (ensure this matches your backend Firebase config)
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();

// const ForgotPasswordAPI = {
//   sendOtp: async (contact) => {
//     try {
//       // Call the backend API to initiate sending the OTP
//       const response = await axios.post("/forgot-password/send-otp", {
//         contact,
//       });
//       const { verificationId } = response.data.data;

//       // Save the verificationId locally for OTP verification
//       return { success: true, verificationId };
//     } catch (error) {
//       console.error(
//         "Error sending OTP:",
//         error.response?.data || error.message
//       );
//       return {
//         success: false,
//         error: error.response?.data?.message || "Failed to send OTP",
//       };
//     }
//   },

//   verifyOtp: async (verificationId, otp) => {
//     try {
//       // Verify OTP using Firebase's PhoneAuthProvider
//       const credential = firebase.auth.PhoneAuthProvider.credential(
//         verificationId,
//         otp
//       );
//       await auth.signInWithCredential(credential);

//       // On successful OTP verification
//       return { success: true, message: "OTP verified successfully!" };
//     } catch (error) {
//       console.error("Error verifying OTP:", error.message);
//       return { success: false, error: "Invalid OTP. Please try again." };
//     }
//   },
// };

// export default ForgotPasswordAPI;
