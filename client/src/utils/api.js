import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
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

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const getUser = () => API.get("/auth/user");

export default API;
