import { NeuralNetwork, likely } from 'brain.js';

const a = character(
  '.#####.' +
    '#.....#' +
    '#.....#' +
    '#######' +
    '#.....#' +
    '#.....#' +
    '#.....#'
);
const b = character(
  '######.' +
    '#.....#' +
    '#.....#' +
    '######.' +
    '#.....#' +
    '#.....#' +
    '######.'
);
const c = character(
  '#######' +
    '#......' +
    '#......' +
    '#......' +
    '#......' +
    '#......' +
    '#######'
);

/**
 * Learn the letters A through C.
 */
const net = new NeuralNetwork();
net.train([
  { input: a, output: { a: 1 } },
  { input: b, output: { b: 1 } },
  { input: c, output: { c: 1 } },
]);

/**
 * Predict the letter A, even with a pixel off.
 */
const result = likely(
  character(
    '.#####.' +
      '#.....#' +
      '#.....#' +
      '###.###' +
      '#.....#' +
      '#.....#' +
      '#.....#'
  ),
  net
);

console.log(result); // 'a'

function character(string: string): number[] {
  return string.trim().split('').map(integer);
}

function integer(character: string): number {
  if (character === '#') return 1;
  return 0;
}
