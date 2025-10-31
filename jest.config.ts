import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // MUI ESM helpers
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', { tsconfig: 'tsconfig.json', useESM: true }],
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!**/*.d.ts',
  ],
};
export default config;
