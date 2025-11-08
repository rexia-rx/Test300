import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@myfitness2/shared-types$': '<rootDir>/../packages/shared-types/src',
    '^@myfitness2/shared-types/(.*)$':
      '<rootDir>/../packages/shared-types/src/$1'
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }]
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/']
};

export default config;
