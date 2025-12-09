/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */


import axios from "axios";

const ENV = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: ENV.VITE_BASE_URL,
  withCredentials: true,
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
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
