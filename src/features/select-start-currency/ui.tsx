import { Box, Flex, Input, Select, Portal, createListCollection, Text } from '@chakra-ui/react';

import { useController } from './model.ts';

import { configExchangeRate } from '@/entities/exchange-rate';
import { AddCurrency } from '@/features/add-currency';

export const SelectStartCurrency = () => {
  const { amount, isButAdd, onAmountChange, onCurrencyChange } = useController();

  const frameworks = createListCollection({
    items: configExchangeRate.Currency,
    itemToString: (item) => `${item.flag} ${item.label}`,
    itemToValue: (item) => item.value,
  });

  return (
    <>
      <Box p="10px" border="1px solid" borderColor="rgb(148, 163, 184)" borderRadius="12px">
        <Text color="gray.500" textStyle="xs">
          вы хотите получить...
        </Text>
        <Flex justifyContent="space-between" gap="10px">
          <Input
            border="none"
            outline="none"
            fontSize="24px"
            fontWeight="700"
            h="40px"
            p="0"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            value={amount}
            onChange={onAmountChange}
          />
          <Select.Root
            collection={frameworks}
            size="sm"
            id="123"
            width="150px"
            defaultValue={['USD']}
            onValueChange={onCurrencyChange(0)}
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="-" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.flag} {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Flex>
      </Box>
      <AddCurrency isAction={isButAdd} />
    </>
  );
};
