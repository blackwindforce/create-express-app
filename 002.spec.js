const f = require("./002");

it("should return null", () => {
  expect(f(-1)).toBe(null);
  expect(f(0)).toBe(null);
  expect(f(2)).toBe(null);
});

it("should return string", () => {
  expect(f(1)).toBe("*");
  expect(f(3)).toBe(" *\n***\n *");
  expect(f(5)).toBe("  *\n ***\n*****\n ***\n  *");
});
