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

export const decodedResistorValue = ([a, b, c]: [
  Color,
  Color,
  Color
]): string =>
  ((d) => (d >= 1000 ? `${d / 1000} kiloohms` : `${d} ohms`))(
    (10 * Colors[a] + Colors[b]) * 10 ** Colors[c]
  );
