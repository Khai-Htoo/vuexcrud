import axios from "axios";
export const domain = "http://127.0.0.1:8000/";
export const axiosClient = axios.create({
  baseURL: domain,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});
