import { describe, expect, it } from "vitest";

import { hello } from "./hello-world";

describe("Hello World", () => {
  it("says hello world", () => {
    expect(hello()).toEqual("Hello, World!");
  });
});
