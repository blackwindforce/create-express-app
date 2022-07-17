const rnaByDna = { A: "U", C: "G", G: "C", T: "A" } as const;

const assertDna: (dna: string) => asserts dna is keyof typeof rnaByDna = (
  dna
) => {
  if (!(dna in rnaByDna)) {
    throw new Error("Invalid input DNA.");
  }
};

export const toRna = (dnas: string): string | never =>
  dnas.replace(/[A-Z]/g, (dna) => (assertDna(dna), rnaByDna[dna]));
