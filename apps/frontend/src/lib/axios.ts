import axios from 'axios';

import { config } from './config';

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('Client.Auth.Request.Failure', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
