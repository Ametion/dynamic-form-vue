module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    testEnvironment: 'jest-environment-jsdom',
};
