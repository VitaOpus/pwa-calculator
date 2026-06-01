import { Button } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

export const CalculateTranslation = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="solid"
      w="188px"
      mt={{ base: 0, sm: '30px' }}
      onClick={() => navigate({ to: '/exchange-rate-calculation' })}
    >
      Рассчитать перевод
    </Button>
  );
};

export default CalculateTranslation;
