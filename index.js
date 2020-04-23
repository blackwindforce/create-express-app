const Benchmark = require("benchmark");

const Y = (f) => ((g) => g(g))((g) => f((x) => g(g)(x)));
const F = (x) => (x === 0 ? 1 : x * F(x - 1));
const YF = Y(() => F);

new Benchmark.Suite("factorial")
  .add("F", () => F(100))
  .add("Y", () => YF(100))
  .on("cycle", (event) => console.log(`${event.target}`))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
