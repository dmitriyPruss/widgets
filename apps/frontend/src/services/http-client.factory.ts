import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ConfigService } from './config.service';
import { IConfigParams } from '../interfaces/config-params';

const httpClientFactory = (configService: ConfigService<IConfigParams>): AxiosInstance => {
  const httpClient = axios.create({
    baseURL: configService.get('NX_APP_API_URL'),
    timeout: 30000
  });

  const authHeaderInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const tokenFromLocalStorage = localStorage.getItem('token');

    if (tokenFromLocalStorage && config.headers) {
      config.headers['Authorization'] = `Bearer ${tokenFromLocalStorage}`;
    }

    return config;
  };

  httpClient.interceptors.request.use(authHeaderInterceptor);

  return httpClient;
};

export default httpClientFactory;
