export class ApiConfiguration {
  public accessToken?: string;
  public baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
}
