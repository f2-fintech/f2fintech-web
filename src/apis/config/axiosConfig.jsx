/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */


import axios from "axios";

const getBaseUrl = () => {
  if (typeof process !== "undefined" && process.env) {
    return process.env.NEXT_PUBLIC_BASE_URL || process.env.VITE_BASE_URL || "http://localhost:8080/api/v1";
  }
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env.NEXT_PUBLIC_BASE_URL || import.meta.env.VITE_BASE_URL || "http://localhost:8080/api/v1";
  }
  return "http://localhost:8080/api/v1";
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404,
  timeout: 60000,
  headers: {
    "companyid": 101
  },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;
  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    throw error;
  }
  return Promise.reject(error);
};
// registering the custom error handler to the
// "api" axios instance
axiosInstance.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
