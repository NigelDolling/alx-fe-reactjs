export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
}