/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.(test|tests).ts',
    '<rootDir>/src/**/*.(test|tests).tsx',
    '<rootDir>/src/**/*.(test|tests).js',
    '<rootDir>/src/**/*.(test|tests).jsx',
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'classic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/style.js',
  },
};
