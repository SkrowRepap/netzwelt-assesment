import axios from "axios";

export const axiosNetzwelt = axios.create({
  baseURL: "https://netzwelt-devtest.azurewebsites.net",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const defaultAxiosBaseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://netzwelt-assesment-dx0hqwrgn-skrowrepap.vercel.app";
