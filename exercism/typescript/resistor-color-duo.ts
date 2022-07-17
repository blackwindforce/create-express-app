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

export const decodedValue = ([a, b]: COLOR[]): number =>
  COLORS[a] * 10 + COLORS[b];
