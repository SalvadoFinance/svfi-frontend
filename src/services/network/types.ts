export interface ResultError {
  message: string;
  code?: number;
}

export interface DataResult {
  response?: any;
  error?: ResultError;
}

export interface NetworkAxiosDataResult extends DataResult {}

export interface NetworkAxiosResult {
  data: NetworkAxiosDataResult;
}

export interface NetworkAxiosHeaders {
  [key: string]: string | number;
  [index: number]: string;
}

export interface NetworkAxiosConfig {
  headers?: NetworkAxiosHeaders;
  params?: any;
}

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers?: HttpHeaders;
  params?: any;
};
