import { Box, Flex, Input, Select, Portal, Text } from '@chakra-ui/react';

import { useController } from './model.ts';

import { AddCurrency } from '@/features/add-currency';

export const SelectStartCurrency = () => {
  const { collection, amount, canAddCurrency, onAmountChange, onCurrencyChange } = useController();

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
            collection={collection}
            size="sm"
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
                  {collection.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.flag} {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Flex>
      </Box>
      <AddCurrency isAction={canAddCurrency} />
    </>
  );
};
