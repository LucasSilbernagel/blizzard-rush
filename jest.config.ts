import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^shadcn/(.*)$': '<rootDir>/shadcn/$1',
    '~/(.*)': '<rootDir>/app/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|mpe?g|aac|woff2?|eot|ttf|otf|ico|pdf|zip)$':
      '<rootDir>/app/mocks/fileMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@web3-storage/multipart-parser|@remix-run)/)',
    'e2e/**/*.ts',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
}

export default config
