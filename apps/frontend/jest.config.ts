import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: __dirname
});

const customConfig: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.(test|spec).[tj]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/../backend/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@myfitness2/shared-types$': '<rootDir>/../packages/shared-types/src',
    '^@myfitness2/shared-types/(.*)$': '<rootDir>/../packages/shared-types/src/$1',
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  }
};

export default createJestConfig(customConfig);
