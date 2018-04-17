// axiosconfig.js
import axios from 'axios';

// configure base url
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

// intercept requests and add authorization token
instance.interceptors.request.use((config) => {
  const token = "1l2ehasoyf32rou"
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});

export default instance;
