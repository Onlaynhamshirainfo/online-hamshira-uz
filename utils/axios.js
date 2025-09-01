import axios from "axios";

export default axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: "application/json",
  },

  ...(typeof window !== "undefined" &&
  location.host === "hambi.onlaynhamshira.uz"
    ? {
        From: "hambi",
      }
    : {}),
});

export const authAxios = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${
      typeof window !== "undefined" ? localStorage?.getItem("auth__key") : null
    }`,

    ...(typeof window !== "undefined" &&
    location.host === "hambi.onlaynhamshira.uz"
      ? {
          From: "hambi",
        }
      : {}),
  },
});
