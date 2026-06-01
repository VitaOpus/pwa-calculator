import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { routes } from '@/pages/routing';

export const CalculateTranslation = () => {
  const openCalculation = useUnit(routes.exchangeRateCalculation.open);

  return (
    <Button variant="solid" w="188px" mt={{ base: 0, sm: '30px' }} onClick={openCalculation}>
      Рассчитать перевод
    </Button>
  );
};

export default CalculateTranslation;
