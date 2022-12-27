import axios from "axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30 * 1000,
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

export default request;
