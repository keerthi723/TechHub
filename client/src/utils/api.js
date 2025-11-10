import axios from "axios";

// Remove /api from here since routes already have /api
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// These will become: /api/auth/register, /api/auth/login, etc.
export const registerUser = (userData) =>
  API.post("/api/auth/register", userData);
export const loginUser = (userData) => API.post("/api/auth/login", userData);
export const getUser = () => API.get("/api/auth/user");

export default API;
