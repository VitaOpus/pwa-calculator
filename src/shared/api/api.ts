import { AxiosRequestConfig } from 'axios';

import { ApiService } from '@/shared/lib';
import { ENDPOINT } from '@/shared/config';

export function calculatorInstance<T>(config: AxiosRequestConfig): Promise<T> {
  const apiService = ApiService.getInstance();
  apiService.selectAppSetting(ENDPOINT.CALCULATOR_SERVICE);

  return apiService.call<T>(config).then((response) => response.data);
}
