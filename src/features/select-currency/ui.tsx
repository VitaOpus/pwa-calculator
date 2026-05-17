import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';

import { AddCurrency } from '../add-currency';

import { useController } from './model.ts';

import type { ExchangeStepV1 } from '@/shared/api';
import { formatMoney, formatNumberRu } from '@/shared/lib';

export const SelectCurrency = () => {
  const { exchangeRate, count, currencyMap, onDelete } = useController();

  return (
    <Flex direction="column" gap="8px">
      {exchangeRate?.steps?.map((step, index) => {
        const { from, rateFromTo, amountTo, to } = step as ExchangeStepV1;
        const isAction = count === index + 1;

        const currencyKey = currencyMap?.[to]?.value;
        const flag = currencyMap?.[to]?.flag;

        return (
          <Fragment key={`${from}-${index}-${to}`}>
            <Flex direction="column" gap="16px">
              <Flex alignItems="center" gap="10px">
                <BsArrowUpCircleFill size="30" style={{ color: 'rgb(148, 163, 184)' }} />
                <Text color="gray.500" textStyle="xs">
                  {`1 ${from} = ${formatMoney(rateFromTo, to)}`}
                </Text>
              </Flex>
              <Box
                p="10px"
                border="1px solid"
                borderColor="rgb(148, 163, 184)"
                borderRadius="12px"
                bg="rgb(226, 232, 240)"
                display="flex"
                flexDirection="column"
              >
                <Text color="gray.500" textStyle="xs">
                  {isAction ? 'вам надо отправить...' : 'через валюту'}
                </Text>
                <Flex alignItems="center" justifyContent="space-between" gap="30px">
                  <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="gray.500"
                    textStyle="xl"
                    fontWeight="bold"
                  >
                    {formatNumberRu(amountTo)}
                  </Text>
                  <Flex alignItems="center" gap="10px">
                    <div>{flag}</div>
                    <Text textStyle="md">{currencyKey}</Text>
                    <IconButton aria-label="Удалить" variant="ghost" onClick={onDelete(index)}>
                      <TiDelete />
                    </IconButton>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <div>
              <AddCurrency isAction={isAction} />
            </div>
          </Fragment>
        );
      })}
    </Flex>
  );
};