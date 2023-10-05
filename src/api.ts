import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});
