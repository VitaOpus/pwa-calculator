import { useExchangeRateContext } from '@/shared/service/exchange-rate';
import { Loader as UiLoader } from '@/shared/ui';

export const Loader = () => {
  const { isPending: loading } = useExchangeRateContext();

  if (!loading) {
    return null;
  }
  return <UiLoader />;
};

export default Loader;
