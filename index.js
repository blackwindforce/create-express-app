const Benchmark = require("benchmark");

const f = (x) => (x === 0 ? 0 : () => f(x - 1));
const F = (f) => (x) => (x === 0 ? 0 : () => f(x - 1));
const Y = (f) => ((f) => f(f))((g) => f((x) => g(g)(x)));
const T = (f) => (x) => {
  let y = f(x);
  while (typeof y === "function") y = y();
  return y;
};
const TF = T(f);
const TYF = T(Y(F));

new Benchmark.Suite("factorial")
  .add("F", () => TF(10000))
  .add("Y", () => TYF(10000))
  .on("cycle", (event) => console.log(`${event.target}`))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
