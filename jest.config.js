export default {
    testEnvironment: 'jsdom',  // Same as in package.json
    transform: {
        "^.+\\.js$": "babel-jest",  // Transforms JavaScript files
    },
    moduleNameMapper: {
        '\\.html$': 'jest-transform-stub',  // Mocks HTML files
        '\\.css$': 'jest-transform-stub',   // Mocks CSS files
    },
};
