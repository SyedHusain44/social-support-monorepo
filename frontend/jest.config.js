export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest'
    },
    moduleNameMapper: {
        // Mock CSS and asset imports
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx']
};
