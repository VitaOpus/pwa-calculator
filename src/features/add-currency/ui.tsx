import {
  Box,
  IconButton,
  Select,
  Portal,
  createListCollection,
  Text,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
import { IoIosAddCircle } from 'react-icons/io';

import { useController } from './model';

interface Props {
  isAction: boolean;
}

export const AddCurrency = ({ isAction }: Props) => {
  const { currency, onSelect } = useController();

  if (!isAction) {
    return null;
  }

  const frameworks = createListCollection({
    items: currency,
    itemToString: (item) => `${item.flag} ${item.label}`,
    itemToValue: (item) => item.value,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
          <IconButton aria-label="Удалить" rounded="full" variant="ghost">
            <IoIosAddCircle
              style={{
                height: '40px',
                width: '40px',
                color: 'rgb(148, 163, 184)',
              }}
            />
          </IconButton>
          <Text color="gray.500" textStyle="sm">
            Добавить валюту
          </Text>
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Выбор валюты</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Select.Root collection={frameworks} size="lg" onValueChange={onSelect}>
                <Select.HiddenSelect />
                <Select.Label>Валюты</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {frameworks.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.flag} {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddCurrency;
