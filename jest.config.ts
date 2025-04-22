import type { Config } from "@jest/types";

const codePath = "<rootDir>/src/app/server_app/server";
const testPath = "<rootDir>/src/test/server_app/server";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${codePath}/**/*.ts`],
  testMatch: [`${testPath}/**/*.ts`],
};

export default config;
