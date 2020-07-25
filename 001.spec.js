const f = require("./001");

it("should return null", () => {
  expect(f("")).toBe(null);
  expect(f("1")).toBe(null);
  expect(f("12")).toBe(null);
});

it("should return string", () => {
  expect(f("123")).toBe("2");
  expect(f("1234")).toBe("23");
  expect(f("12345")).toBe("234");
});
