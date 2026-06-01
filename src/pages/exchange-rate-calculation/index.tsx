import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { usePageForm } from './model';

import { ExchangeRateContext, useCurrencyRates } from '@/shared/service/exchange-rate';

import { Loader, useExchangeCalculation } from '@/entities/exchange-rate';
import { SelectCurrency, SelectStartCurrency } from '@/features';
import { Loading } from '@/shared/ui';

export const ExchangeRateCalculation: FC = () => {
  const form = usePageForm();
  const { isLoading: ratesLoading } = useCurrencyRates();
  const calculation = useExchangeCalculation();

  if (ratesLoading) {
    return <Loading />;
  }

  return (
    <ExchangeRateContext.Provider value={calculation}>
      <form.AppForm>
        <Box layerStyle="container" display="flex" flexDirection="column" p="30px 31px">
          <Flex direction="column" gap="30px">
            <Heading size="2xl">Валютный маршрут</Heading>
            <Flex direction="column" gap="2">
              <Text color="gray.500" textStyle="sm">
                Введите сумму, которую хотите получить - <br />
                мы подскажем, сколько нужно отправить через выбранную валюту.
              </Text>
            </Flex>
            <Box position="relative" display="flex" flexDirection="column" gap="15px">
              <Loader />
              <SelectStartCurrency />
              <SelectCurrency />
            </Box>
          </Flex>
        </Box>
      </form.AppForm>
    </ExchangeRateContext.Provider>
  );
};
