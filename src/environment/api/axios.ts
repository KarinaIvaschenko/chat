import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await localStorage.getItem('user');

    if (token) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${JSON.parse(token)}`,
      );
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  },
);

export default axios;
