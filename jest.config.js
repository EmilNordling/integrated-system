/* eslint-disable */

module.exports = {
  preset: 'ts-jest',
  // Allows jest to go into node_modules
  transform: {
    '.js': 'jest-esm-transformer',
  },
  transformIgnorePatterns: [],
  testMatch: ['**/*.test.(ts|tsx)'],
  globals: {
    'ts-jest': {
      // useESM: true,
      tsconfig: 'tsconfig.test.json',
    },
  },
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFiles: ['<rootDir>/scripts/jest_setup.js'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@api/(.*)': '<rootDir>/src/application/api/$1',
    '@controllers/(.*)': '<rootDir>/src/application/controllers/$1',
    '@services/(.*)': '<rootDir>/src/application/services/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
  },
};
