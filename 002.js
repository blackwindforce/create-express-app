const { none, some } = require("fp-ts/lib/Option");

/**
 * Your task is to return a string that displays a diamond shape on the screen
 * using asterisk ("*") characters. The shape that the print method will return
 * should resemble a diamond. A number provided as input will represent the
 * number of asterisks printed on the middle line. The line above and below will
 * be centered and will have two less asterisks than the middle line. This
 * reduction will continue for each line until a line with a single asterisk is
 * printed at the top and bottom of the figure. Return null if input is an even
 * number or a negative number. Note: JS and Python students must implement
 * diamond() method and return None (Py) or null(JS) for invalid input.
 *
 * @param {number} a
 * @returns {import('fp-ts/lib/Option').Option<string>}
 * @see {@link https://dev.to/thepracticaldev/daily-challenge-2-string-diamond-21n2}
 * @example
 *   join "\n" (concat u (reverse tail u))
 *     where u = unfold a
 */
module.exports = (a) => (a < 0 || a % 2 === 0 ? none : some("*"));
