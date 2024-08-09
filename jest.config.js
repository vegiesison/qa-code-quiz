
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ["/node_modules/", "/cypress/", "/test.tsx$"],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
    testEnvironment: 'jsdom',
};
