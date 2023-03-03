import httpClientFactory from "./http-client.factory";
import UsersService from './users.service';
import { IConfigParams } from '../interfaces/config-params';
import { ConfigService } from './config.service';
// import LocalStorageService from "./local-storage.service";

export const configService = new ConfigService<IConfigParams>();
export const httpClient = httpClientFactory(configService);
export const usersService = new UsersService(httpClient);
// export const localStorageService = new LocalStorageService(); 
