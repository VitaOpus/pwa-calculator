import { Box, EmptyState, Flex, VStack } from '@chakra-ui/react';
import { HiMinusCircle } from 'react-icons/hi';

export function AuthError() {
  return (
    <Box layerStyle="container" display="flex" justifyContent="center" alignItems="center" m="30px 0 10px 0">
      <Flex w="327px" gap="30px" direction="column">
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator color="red.400">
              <HiMinusCircle />
            </EmptyState.Indicator>
            <VStack textAlign="center" color="red.400">
              <EmptyState.Title>Ошибка авторизации</EmptyState.Title>
              <EmptyState.Description>
                Мы не смогли вас авторизовать, возможно приложение запущено не через Telegram
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Flex>
    </Box>
  );
}

export default AuthError;
