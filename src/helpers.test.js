import { calculateWinner } from "./helpers.js";

/* tests follow this form:
 *
 * 1. Arrange - setup the tests
 * 2. Act - perform the action we're testing
 * 3. Assert - verify the results
 */

test('X as winner, with top row win', () => {
  const squares = ['X', 'X', 'X', 'O', null, 'O', null, null, null];
  const winner = calculateWinner(squares);
  expect(winner).toBe('X');
});

test('O as winner, with diaganol win', () => {
  const squares = ['O', 'X', null, 'X', 'O', 'X', null, null, 'O'];
  const winner = calculateWinner(squares);
  expect(winner).toBe('O');
});

test('no winner yet', () => {
  const squares = ['X', 'O', null, 'X', 'O', 'X', null, null, 'O'];
  const winner = calculateWinner(squares);
  expect(winner).toBe(null);
});
