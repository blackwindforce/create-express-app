/**
 * Your goal is to create a function that removes the first and last letters of
 * a string. Strings with two characters or less are considered invalid. You can
 * choose to have your function return null or simply ignore.
 *
 * @param {string} a
 * @returns {?string}
 * @see {@link https://dev.to/thepracticaldev/daily-challenge-1-string-peeler-4nep}
 */
module.exports = (a) => (a.length <= 2 ? null : a.slice(1, -1));
