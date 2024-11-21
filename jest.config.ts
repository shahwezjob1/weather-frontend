// eslint-disable-next-line import/no-anonymous-default-export
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  };