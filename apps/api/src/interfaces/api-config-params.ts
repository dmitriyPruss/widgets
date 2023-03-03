import { IDatabaseConfigParams } from '@boilerplate/data';

export interface IApiConfigParams extends IDatabaseConfigParams {
  NX_LOG_DIR: string;
  NX_ENABLE_VERBOSE_REQUESTS_LOGGING: string;
  NX_ENABLE_RESPONSE_BODY_LOGGING: string;
  
  NX_AMAZON_IVS_REGION: string;
  NX_AMAZON_IVS_ACCESS_KEY_ID: string;
  NX_AMAZON_IVS_SECRET_ACCESS_KEY: string;
}
