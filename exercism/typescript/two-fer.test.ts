import { describe, expect, it } from "vitest";

import { twoFer } from "./two-fer";

describe("TwoFer", () => {
  it("no name given", () => {
    expect(twoFer()).toEqual("One for you, one for me.");
  });

  it("a name given", () => {
    expect(twoFer("Alice")).toEqual("One for Alice, one for me.");
  });

  it("another name given", () => {
    expect(twoFer("Bob")).toEqual("One for Bob, one for me.");
  });
});
