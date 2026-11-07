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

const axiosClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("API ERRORR", error);
    let res = error.response;
    if (res.status == 401) {
      alert(res.data.msg);
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
