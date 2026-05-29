type AppSettings = Record<string, string>;

interface AuthData {
  access_token: string;
  token_type: string;
}

export interface RequestConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, string> | URLSearchParams;
}

export default class ApiService {
  private static INSTANCE?: ApiService;

  private baseURL: string = '';

  private commonHeaders: Record<string, string> = {};

  private endpoints: Partial<AppSettings> = {};

  private initData: string = '';

  private readonly TIMEOUT_MS = 10_000;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.INSTANCE) {
      ApiService.INSTANCE = new ApiService();
    }

    return ApiService.INSTANCE;
  }

  public setAuthorization(access: AuthData): void {
    if (access) {
      this.commonHeaders['Authorization'] = `${access.token_type} ${access.access_token}`;
    }
  }

  public setInitData(initData?: string): void {
    if (initData === undefined || initData === null) {
      throw new Error('Not fined initData');
    }

    this.initData = initData;
    this.commonHeaders['x-telegram-initdata'] = this.initData;
  }

  public setAppSettings(appSettings: Partial<AppSettings>): void {
    this.endpoints = appSettings;
  }

  public setBaseUrl(baseUrl: string): void {
    this.baseURL = baseUrl;
  }

  public selectAppSetting(endpoint: string): void {
    if (!this.endpoints[endpoint]) {
      throw new Error(`Not fined endpoint ${endpoint} to AppSetting`);
    }

    this.commonHeaders['X-System-Id'] = 'mini-app-calculator';
    this.baseURL = this.endpoints[endpoint]!;
  }

  public async call<R>(config: RequestConfig): Promise<{ data: R }> {
    const { url, method, data, params, headers: configHeaders = {} } = config;

    // paramsSerializer: воспроизводит new URLSearchParams(params).toString()
    const queryString = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : '';
    const fullUrl = `${this.baseURL}${url}${queryString ? `?${queryString}` : ''}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(fullUrl, {
        method,
        headers: {
          ...this.commonHeaders,
          ...configHeaders,
          ...(data !== undefined ? { 'Content-Type': 'application/json' } : {}),
        },
        body: data !== undefined ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeoutId);
      // воспроизводит error.code === 'ECONNABORTED' && error.message.includes('timeout')
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Request timed out');
      }
      throw error;
    }

    clearTimeout(timeoutId);

    // воспроизводит validateStatus: status >= 200 && status < 400
    if (response.status < 200 || response.status >= 400) {
      if (response.status === 401) {
        console.error('Error code 401');
      }
      throw new Error(`HTTP error ${response.status}`);
    }

    const responseData: R = await response.json();
    return { data: responseData };
  }

  public static destroy(): void {
    if (ApiService.INSTANCE) {
      delete ApiService.INSTANCE.commonHeaders['Authorization'];
      delete ApiService.INSTANCE.commonHeaders['Id-Token'];
      ApiService.INSTANCE = undefined;
    }
  }
}
