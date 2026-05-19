export const ERRORS: Record<string, { key: string; message?: string }> = {
  AUTH_001: {
    key: 'AUTH_001',
    message: 'Invalid Telegram signature',
  },
  AUTH_002: {
    key: 'AUTH_002',
    message: 'Telegram data too old',
  },
  AUTH_003: {
    key: 'AUTH_003',
    message: 'Invalid token',
  },
  EXCHANGE_001: {
    key: 'EXCHANGE_001',
  },
  EXCHANGE_002: {
    key: 'EXCHANGE_002',
    message: 'Not steps',
  },
  EXCHANGE_003: {
    key: 'EXCHANGE_003',
    message: 'Not amount',
  },
  EXCHANGE_004: {
    key: 'EXCHANGE_004',
    message: 'Path must have at least two currencies',
  },
  CRON_001: {
    key: 'CRON_001',
    message: 'No such admin chat id',
  },
};

export default {};
