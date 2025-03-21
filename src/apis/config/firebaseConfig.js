// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const ENV = import.meta.env;

// Firebase configuration (from Firebase Console)
console.log("env", ENV.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN);
const firebaseConfig = {
    apiKey: ENV.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: ENV.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: ENV.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: ENV.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.VITE_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
auth.languageCode = 'en';
