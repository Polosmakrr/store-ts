// http.service.js

// It could be any fetching services, such as default fetch, call api, xhr, etc.
import axios, { AxiosStatic } from 'axios';
import { STORAGE_KEYS } from '../consts/app-keys.const';

export class HttpService {
  public baseUrl: string;

  public fetchingService: AxiosStatic;

  public apiVersion: string;

  constructor(
    baseUrl = 'http://localhost:4200/',
    fetchingService: AxiosStatic = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl!;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}${this.apiVersion}/${url}`;
  }

  private populateTokenToHeader() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`
      }
    };
  }

  async get(route: string) {
    const response = await this.fetchingService.get(
      this.getFullApiUrl(route),
      this.populateTokenToHeader()
    );
    return response.data;
  }

  async post<T>(route: string, body: T) {
    const response = await this.fetchingService.post(
      this.getFullApiUrl(route),
      body,
      this.populateTokenToHeader()
    );
    return response.data;
  }

  async put<T>(route: string, body: T) {
    const response = await this.fetchingService.put(
      this.getFullApiUrl(route),
      body,
      this.populateTokenToHeader()
    );
    return response.data;
  }

  async delete(route: string) {
    const response = await this.fetchingService.delete(
      this.getFullApiUrl(route),
      this.populateTokenToHeader()
    );
    return response.data;
  }
}
