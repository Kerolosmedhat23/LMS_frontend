import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // adjust if backend runs on another host/port
});

// Attach bearer token if found in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
