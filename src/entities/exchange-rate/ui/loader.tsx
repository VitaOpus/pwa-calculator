import { useLoading } from '@/entities/exchange-rate';
import { Loader as UiLoader } from '@/shared/ui';

export const Loader = () => {
  const loading = useLoading();

  if (!loading) {
    return null;
  }
  return <UiLoader />;
};

export default Loader;
