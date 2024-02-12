// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem('authToken');

    // Set the Authorization header if a token is present
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
