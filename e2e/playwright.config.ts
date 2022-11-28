import { PlaywrightTestConfig } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const {
  CI,
  ROOT_URL,
  WEB_PORT = 3000,
  GLOBAL_TIMEOUT,
  TEST_TIMEOUT,
} = process.env;

const config: PlaywrightTestConfig = {
  workers: CI ? 2 : undefined,
  // globalSetup: require.resolve("./globalSetup.ts"),
  globalTimeout: GLOBAL_TIMEOUT ?? CI ? 120000 : 30000,
  timeout: TEST_TIMEOUT ?? CI ? 30000 : 15000,
  reporter: CI ? [["dot"], ["junit", { outputFile: "junit.xml" }]] : "line",
  use: {
    baseURL: ROOT_URL ?? `http://localhost:${WEB_PORT}`,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: CI ? "retain-on-failure" : "on",
    screenshot: CI ? "only-on-failure" : "on",
    trace: CI ? "retain-on-failure" : "on",
  },
};

export default config;
