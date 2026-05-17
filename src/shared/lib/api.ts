import { AxiosPromise, AxiosRequestConfig } from 'axios';

import ApiService from './api-service';

const apiService = ApiService.getInstance();

function methodFile<T>(method: string, url: string, params: T): AxiosRequestConfig {
  return {
    url,
    method,
    responseType: 'blob',
    params,
  };
}

function methodGet<T>(url: string, params?: T): AxiosRequestConfig {
  return {
    url,
    method: 'GET',
    params,
  };
}

function methodPost<T>(url: string, params: T): AxiosRequestConfig {
  return {
    url,
    method: 'POST',
    data: params,
  };
}

function methodPut<T>(url: string, params: T): AxiosRequestConfig {
  return {
    url,
    method: 'PUT',
    data: params,
  };
}

function methodDelete<T>(url: string, params: T): AxiosRequestConfig {
  return {
    url,
    method: 'DELETE',
    params,
  };
}

export const MOCK_DATA = 'mockData';
export const MockPromise = (): AxiosPromise =>
  Promise.resolve({
    data: MOCK_DATA,
  }) as AxiosPromise;

const getUrlMatchParams = (url: string): RegExpMatchArray[] =>
  Array.from(url.matchAll(/\/:([a-zA-Z]+)/g));

const changeURforMask = <T extends Record<string, string>>(url: string, params: T): string => {
  const urlMatchParams = getUrlMatchParams(url);
  const paramsCopy = { ...params };

  let matchUrl = url;
  urlMatchParams.forEach((item) => {
    const key = item[1];

    if (!(key in paramsCopy)) {
      throw new Error(`Missing URL mask parameter: ${key}`);
    }

    const value = paramsCopy[key];
    matchUrl = matchUrl.replace(`:${key}`, value);

    delete paramsCopy[key];
  });

  return matchUrl;
};

export const api = {
  file:
    (endpoint: string, url: string, method: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T extends Record<string, any>, J>(params: T): Promise<J> => {
      apiService.selectAppSetting(endpoint);

      const matchUrl = changeURforMask(url, params);

      return apiService
        .call<J>(methodFile<T>(method, matchUrl, params))
        .then((response) => response.data);
    },
  post:
    (endpoint: string, url: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T extends Record<string, any>, J>(params: T): Promise<J> => {
      apiService.selectAppSetting(endpoint);

      const matchUrl = changeURforMask(url, params);

      return apiService.call<J>(methodPost<T>(matchUrl, params)).then((response) => response.data);
    },
  get:
    (endpoint: string, url: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T extends Record<string, any>, J>(params: T): Promise<J> => {
      apiService.selectAppSetting(endpoint);

      const matchUrl = changeURforMask(url, params);

      return apiService.call<J>(methodGet<T>(matchUrl, params)).then((response) => response.data);
    },
  put:
    (endpoint: string, url: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T extends Record<string, any>, J>(params: T): Promise<J> => {
      apiService.selectAppSetting(endpoint);

      const matchUrl = changeURforMask(url, params);

      return apiService.call<J>(methodPut<T>(matchUrl, params)).then((response) => response.data);
    },
  delete:
    (endpoint: string, url: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T extends Record<string, any>, J>(params: T): Promise<J> => {
      apiService.selectAppSetting(endpoint);

      const matchUrl = changeURforMask(url, params);

      return apiService
        .call<J>(methodDelete<T>(matchUrl, params))
        .then((response) => response.data);
    },
};
