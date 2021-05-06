/* eslint-disable */

module.exports = {
  preset: 'ts-jest',
  transform: {
    '.js': 'jest-esm-transformer',
  },
  transformIgnorePatterns: [],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.(ts|tsx)'],
  globals: {
    'ts-jest': {
      // useESM: true,
      tsconfig: 'tsconfig.test.json',
    },
  },
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFiles: ['<rootDir>/scripts/jest_setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/scripts/jest_setup_after_env.ts'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@api/(.*)': '<rootDir>/src/application/api/$1',
    '@controllers/(.*)': '<rootDir>/src/application/controllers/$1',
    '@services/(.*)': '<rootDir>/src/application/services/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
  },
};
