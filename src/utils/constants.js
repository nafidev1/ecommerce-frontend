import axios from "axios";

export const backendLink = "https://ecommerce-backend-b63w.onrender.com/api";

export const ax = axios.create({
  baseURL: backendLink,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const tealColor = "#25ACB2";

