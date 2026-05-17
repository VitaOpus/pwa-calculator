export default {
  'calculator-service-api': {
    input: './api-schemas/schemas/calculator-service.json',
    output: {
      target: 'src/shared/api/calculatorService.ts',
      override: {
        mutator: {
          path: 'src/shared/api/api.ts',
          name: 'calculatorInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: [
        {
          command: 'npm run format',
        },
        {
          command: 'npm run lint-api:fix',
        },
      ],
    },
  },
};
