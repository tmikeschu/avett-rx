import "@testing-library/jest-dom";

import fetch from "cross-fetch";
import dotenv from "dotenv";

import { initializeApollo } from "lib/apollo-client";
dotenv.config({ path: ".env.local" });

import { server } from "mocks/server";

const client = initializeApollo({}, { httpOptions: { fetch: fetch } });
beforeEach(() => {
  // console.log("before each");
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  client.clearStore();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export {};
