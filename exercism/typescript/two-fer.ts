export function twoFer(): "One for you, one for me.";
export function twoFer<T extends string>(name: T): `One for ${T}, one for me.`;
export function twoFer(name = "you"): string {
  return `One for ${name}, one for me.`;
}
