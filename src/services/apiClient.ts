import axios from "axios";

const api = axios.create({
  baseURL: "https://bookit-backend-ouc2.onrender.com/api", // backend base URL
});

export default api;
