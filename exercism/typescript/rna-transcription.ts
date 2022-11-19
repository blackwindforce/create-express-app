type Dna = keyof typeof RnaByDna;

const RnaByDna = { A: "U", C: "G", G: "C", T: "A" };

const assertDna = (dna: string): asserts dna is Dna => {
  if (!Object.hasOwn(RnaByDna, dna)) throw new Error("Invalid input DNA.");
};

export const toRna = (dna: string): string | never =>
  dna.replace(/[A-Z]/g, (dna) => (assertDna(dna), RnaByDna[dna]));
