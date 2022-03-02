import axios from "axios";

const request = axios.create({
  baseURL: "https://api.stridy.com/v1",
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
