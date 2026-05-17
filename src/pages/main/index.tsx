import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import peopleCurrency from './people_currency.svg';

import { CalculateTranslation } from '@/features/calculate-translation';

export const Main: FC = () => {
  return (
    <Box
      layerStyle="container"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="30px 31px"
      gap="45px"
    >
      <Flex height="100%" direction="column" gap="30px">
        <Flex direction="column" gap="10px">
          <Heading size="2xl">Умный валютный маршрут</Heading>
          <Flex direction="column" gap="2">
            <Text color="gray.500" textStyle="sm">
              Хочешь получить 100 $? Посчитаем, сколько нужно отправить — с учётом промежуточной
              валюты
            </Text>
            <Text color="gray.500" textStyle="xs">
              Например: из рублей → в доллары через тенге
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" justifyContent="center" alignItems="center" gap="20px">
          <img src={peopleCurrency} style={{ border: 'none', backgroundColor: '#fff' }} />
          <CalculateTranslation />
        </Flex>
      </Flex>
      <Box>
        <Text color="gray.500" textStyle="xs">
          Только расчёт, без переводов.
          <br /> Комиссии не учитываются.
        </Text>
      </Box>
    </Box>
  );
};
