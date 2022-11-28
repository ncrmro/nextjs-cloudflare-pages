import { test as base } from "@playwright/test";

export type TestFixtures = {};

type WorkerFixtures = {};

const test = base.extend<TestFixtures, WorkerFixtures>({});

export default test;
