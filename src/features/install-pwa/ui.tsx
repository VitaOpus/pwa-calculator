import { Button } from '@chakra-ui/react';
import { MdInstallDesktop } from 'react-icons/md';

import { useController } from './model';

export const InstallPwa = () => {
  const { canInstall, onInstall } = useController();

  if (!canInstall) {
    return null;
  }

  return (
    <Button variant="outline" size="sm" onClick={onInstall}>
      <MdInstallDesktop />
      Установить приложение
    </Button>
  );
};
