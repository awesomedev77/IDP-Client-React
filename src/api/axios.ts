import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    config.headers.Authorization = JSON.parse(token).state.token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;