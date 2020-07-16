const { none, some } = require("fp-ts/lib/Option");

const f = require("./002");

it("should return none", () => {
  expect(f(-1)).toStrictEqual(none);
  expect(f(0)).toStrictEqual(none);
  expect(f(2)).toStrictEqual(none);
});

it("should return some", () => {
  expect(f(1)).toStrictEqual(some("*"));
  expect(f(3)).toStrictEqual(some(" *\n***\n *"));
  expect(f(5)).toStrictEqual(some("  *\n ***\n*****\n ***\n  *"));
});
