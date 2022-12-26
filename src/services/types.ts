export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IBasePage {
  pageSize: number;
  pageIndex: number;
  total: number;
}

export interface ResultError {
  message: string;
  code?: number;
}

export interface DataResult<T> {
  response?: T;
  error?: ResultError;
}
