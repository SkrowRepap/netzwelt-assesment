import axios from "axios";

export const axiosNetzwelt = axios.create({
  baseURL: "https://netzwelt-devtest.azurewebsites.net",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
