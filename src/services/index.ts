import ApiClient from '_src/services/network/ApiClient';
import { ApiConfiguration } from '_src/services/network/ApiConfiguration';
import Coingecko from 'coingecko-api';

import TokenService from './tokens';

import { SERVICE_BASE_URL_COINGECKO } from '_constants/services';

class Services {
  tokens: TokenService;
  coingecko: Coingecko;
  constructor() {
    this.tokens = new TokenService(new ApiClient(new ApiConfiguration(SERVICE_BASE_URL_COINGECKO)));
    this.coingecko = new Coingecko();
  }
}

export default new Services();
export * as EvmService from './evm';
