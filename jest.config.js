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
  setupFilesAfterEnv: ['tsconfig-paths/register'] // tsconfig-paths/register 추가
};
