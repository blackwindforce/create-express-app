const { none, some } = require("fp-ts/lib/Option");

const f = require("./001.js");

it("should return none", () => {
  expect(f("")).toStrictEqual(none);
  expect(f("1")).toStrictEqual(none);
  expect(f("12")).toStrictEqual(none);
});

it("should return some", () => {
  expect(f("123")).toStrictEqual(some("2"));
  expect(f("1234")).toStrictEqual(some("23"));
  expect(f("12345")).toStrictEqual(some("234"));
});
