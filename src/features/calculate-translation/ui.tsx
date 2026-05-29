import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const CalculateTranslation = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="solid"
      w="188px"
      mt={{ base: 0, sm: '30px' }}
      onClick={() => navigate('/exchange-rate-calculation')}
    >
      Рассчитать перевод
    </Button>
  );
};

export default CalculateTranslation;
