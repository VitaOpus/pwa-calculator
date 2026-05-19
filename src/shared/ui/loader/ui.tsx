import { Box, Spinner } from '@chakra-ui/react';

export const Loader = () => {
  return (
    <Box position="absolute" top="50%" left="50%">
      <Spinner />
    </Box>
  );
};

export default Loader;
