import { Box, Flex, HStack, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box
      layerStyle="container"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="30px 0 10px 0"
    >
      <Flex w="327px" gap="30px" direction="column">
        <Stack gap="6" maxW="xs">
          <HStack width="full">
            <SkeletonText noOfLines={2} />
          </HStack>
          <Skeleton height="200px" />
        </Stack>
      </Flex>
    </Box>
  );
}

export default Loading;
