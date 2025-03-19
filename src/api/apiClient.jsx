import axios from "axios";

const ENV = import.meta.env;

const axiosClient = axios.create({
  baseURL: ENV.VITE_BASE_URL,
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
