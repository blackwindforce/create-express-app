type COLOR = keyof typeof COLORS;

const COLORS = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
} as const;

export const decodedResistorValue = ([a, b, c]: COLOR[]):
  | `${number} ohms`
  | `${number} kiloohms` =>
  ((ohms) => (ohms >= 1000 ? `${ohms / 1000} kiloohms` : `${ohms} ohms`))(
    (COLORS[a] * 10 + COLORS[b]) * 10 ** COLORS[c]
  );
