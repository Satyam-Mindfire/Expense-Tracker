import axios from "axios";
import { timeout } from "../constants/constant";

// Initialize axios api instance
export const api = axios.create({
  baseURL: "http://localhost:3002/api/v1/",
  timeout: timeout,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
});