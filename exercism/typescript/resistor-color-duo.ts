type Color = keyof typeof Colors;

enum Colors {
  black,
  brown,
  red,
  orange,
  yellow,
  green,
  blue,
  violet,
  grey,
  white,
}

export const decodedValue = ([a, b]: [Color, Color, ...Color[]]): number =>
  10 * Colors[a] + Colors[b];
