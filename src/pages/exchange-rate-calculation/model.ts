import { useAppForm } from '@/entities/exchange-rate';

export const usePageForm = () =>
  useAppForm({
    defaultValues: {
      steps: ['USD'] as string[],
      amount: '10',
    },
    onSubmit: () => {},
  });

export default {};
