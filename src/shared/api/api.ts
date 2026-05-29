import ApiService, { type RequestConfig } from '@/shared/lib/api-service';

import { ENDPOINT } from '@/shared/config';

export function calculatorInstance<T>(config: RequestConfig): Promise<T> {
  const apiService = ApiService.getInstance();
  apiService.selectAppSetting(ENDPOINT.CALCULATOR_SERVICE);

  return apiService.call<T>(config).then((response) => response.data);
}
