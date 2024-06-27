module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  rootDir: ".",
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  verbose: true,
  moduleNameMapper: {},
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
};
