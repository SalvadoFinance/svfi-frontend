import Axios, { AxiosInstance } from 'axios';
import JSONbig from 'json-bigint';

import { RequestConfig } from './types';
import { ApiConfiguration } from './ApiConfiguration';
import { DataResult } from '_src/services/types';

export default class ApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(apiConfiguration: ApiConfiguration): AxiosInstance {
    return Axios.create({
      baseURL: apiConfiguration.baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfiguration.accessToken && {
          Authorization: `Bearer ${apiConfiguration.accessToken}`,
        }),
      },
      timeout: 30 * 1000,
      // transformResponse: [
      //   function (data) {
      //     // return JSONbig.parse(data);
      //     try {
      //       return JSONbig({ useNativeBigInt: false, storeAsString: true }).parse(data);
      //     } catch (_) {
      //       console.log(1);
      //       return data;
      //     }
      //   },
      // ],
    });
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig,
  ): Promise<DataResult<TResponse>> {
    try {
      const response = config ? await this.client.post(path, payload, config) : await this.client.post(path, payload);
      return { response: response.data };
    } catch (error) {
      const e: Error = error as Error;
      return { error: { message: e.message } };
    }
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<DataResult<TResponse>> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return { response: response.data };
    } catch (error) {
      const e: Error = error as Error;
      return { error: { message: e.message } };
    }
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<DataResult<TResponse>> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return { response: response.data };
    } catch (error) {
      const e: Error = error as Error;
      return { error: { message: e.message } };
    }
  }

  async get<TResponse>(path: string, config?: RequestConfig): Promise<DataResult<TResponse>> {
    try {
      const response = await this.client.get<TResponse>(path, config);
      return { response: response.data };
    } catch (error) {
      const e: Error = error as Error;
      return { error: { message: e.message } };
    }
  }
}
