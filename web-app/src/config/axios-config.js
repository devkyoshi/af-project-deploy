import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_COUNTRY_API_URL,
});

export default api;
