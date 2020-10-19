module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  // globals: {
  //   "ts-jest": {
  //     tsConfig: "tsconfig.json",
  //     jsx: "react",
  //   },
  // },
  moduleNameMapper: {
    "^(components|features|lib|test|mocks)/(.*)$": "<rootDir>/src/$1/$2",
    "^(test)$": "<rootDir>/src/$1",
    "^(mocks)$": "<rootDir>/src/$1",
    "^(api)$": "<rootDir>/__generated__/$1",
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup-env.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/test",
    "src/mocks",
    "src/lib/apollo-client.tsx",
    "__generated__",
  ],
};
