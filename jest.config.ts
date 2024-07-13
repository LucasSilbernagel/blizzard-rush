import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^shadcn/(.*)$': '<rootDir>/shadcn/$1',
    '~/(.*)': '<rootDir>/app/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@web3-storage/multipart-parser|@remix-run)/)',
  ],
}

export default config
