module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src'],
  testEnvironment: 'node',
  testRegex: '.e2e.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['tsconfig-paths/register'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
