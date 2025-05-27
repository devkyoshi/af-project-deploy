// vitest.setup.js
import "@testing-library/jest-dom/vitest"; // ← this imports & does expect.extend for you
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
