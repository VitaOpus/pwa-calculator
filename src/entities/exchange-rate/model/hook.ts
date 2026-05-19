import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import type { ReactFormExtendedApi } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

import { serviceExchangeRate } from '@/shared/service';

export const { fieldContext, formContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

export type AppFormValues = { steps: string[]; amount: string };

type AppForm = ReactFormExtendedApi<
  AppFormValues,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
>;

export const useAppFormContext = (): AppForm => {
  return useFormContext() as unknown as AppForm;
};

export const useLoading = () => {
  return useUnit(serviceExchangeRate.store.$loading);
};
