import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosError } from 'axios';

type AppSettings = Record<string, string>;

interface AuthData {
  access_token: string;
  token_type: string;
}

type SerializeParams = string | string[][] | Record<string, string> | URLSearchParams;

export default class ApiService {
  private static INSTANCE?: ApiService;

  private axios: AxiosInstance;

  private endpoints: Partial<AppSettings>;

  private initData: string = '';

  private constructor() {
    this.axios = axios.create({
      validateStatus: (status: number) => status >= 200 && status < 400,
      paramsSerializer: (params?: SerializeParams) => new URLSearchParams(params).toString(),
    });

    this.axios.interceptors.request.use((config) => {
      config.timeout = 10000;
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          console.log('Request timed out');
        }

        if (error.response?.status === 401) {
          console.error('Error code 401');
        }

        return Promise.reject(error);
      },
    );

    this.endpoints = {};
  }

  public static getInstance(): ApiService {
    if (!ApiService.INSTANCE) {
      ApiService.INSTANCE = new ApiService();
    }

    return ApiService.INSTANCE;
  }

  public setAuthorization(access: AuthData): void {
    if (access) {
      this.axios.defaults.headers.common.Authorization = `${access.token_type} ${access.access_token}`;
    }
  }

  public setInitData(initData?: string): void {
    if (initData === undefined || initData === null) {
      throw new Error('Not fined initData');
    }

    this.initData = initData;
    this.axios.defaults.headers.common['x-telegram-initdata'] = this.initData;
  }

  public setAppSettings(appSettings: Partial<AppSettings>): void {
    this.endpoints = appSettings;
  }

  public setBaseUrl(baseUrl: string): void {
    this.axios.defaults.baseURL = baseUrl;
  }

  public selectAppSetting(endpoint: string) {
    if (!this.endpoints[endpoint]) {
      throw new Error(`Not fined endpoint ${endpoint} to AppSetting`);
    }

    this.axios.defaults.headers.common['X-System-Id'] = 'mini-app-calculator';
    this.axios.defaults.baseURL = this.endpoints[endpoint];
  }

  //public setAuthorization({ access }: AuthData): void {
  //  if (access) {
  //    this.axios.defaults.headers.common.Authorization = `${access.token_type} ${access.access_token}`;
  //    this.axios.defaults.headers.common['Id-Token'] = access.id_token;
  //  }
  //}

  public call<R>(data: AxiosRequestConfig): AxiosPromise<R> {
    return this.axios.request(data);
  }

  public static destroy(): void {
    if (ApiService.INSTANCE) {
      ApiService.INSTANCE.axios.defaults.headers.common.Authorization = undefined;
      ApiService.INSTANCE.axios.defaults.headers.common['Id-Token'] = undefined;
      ApiService.INSTANCE = undefined;
    }
  }
}
