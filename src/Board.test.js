import { render, fireEvent } from "@testing-library/react";
import Board from "./Board.js";

test('players alternate each turn', () => {
  const board = render(<Board initialSquares={Array(9).fill(null)} />);
  const buttons = board.queryAllByRole('button');

  // test empty board first
  buttons.forEach(b => expect(b.innerHTML).toBe(''));

  fireEvent.click(buttons[5]);
  expect(buttons[5].innerHTML).toBe('X');

  fireEvent.click(buttons[4]);
  expect(buttons[4].innerHTML).toBe('O');

  fireEvent.click(buttons[2]);
  expect(buttons[2].innerHTML).toBe('X');
});

test('no more moves after a win is made', () => {
  const board = render(<Board initialSquares={Array(9).fill(null)} />);
  const buttons = board.queryAllByRole('button');

  fireEvent.click(buttons[5]);
  expect(buttons[5].innerHTML).toBe('X');

  fireEvent.click(buttons[4]);
  expect(buttons[4].innerHTML).toBe('O');

  fireEvent.click(buttons[2]);
  expect(buttons[2].innerHTML).toBe('X');

  fireEvent.click(buttons[6]);
  expect(buttons[6].innerHTML).toBe('O');

  // game winning move
  fireEvent.click(buttons[8]);
  expect(buttons[8].innerHTML).toBe('X');

  // moves after should not register, even if an empty space
  fireEvent.click(buttons[0]);
  expect(buttons[0].innerHTML).toBe('');
});

test('players cannot overlap squares', () => {
  const board = render(<Board initialSquares={Array(9).fill(null)} />);
  const buttons = board.queryAllByRole('button');

  fireEvent.click(buttons[2]);
  expect(buttons[2].innerHTML).toBe('X');

  fireEvent.click(buttons[2]);
  expect(buttons[2].innerHTML).toBe('X');
});

/* status */

test('status alternates each turn', () => {
  const board = render(<Board initialSquares={Array(9).fill(null)} />);
  const status = board.getByText('Next player', {exact: false});
  const buttons = board.queryAllByRole('button');

  expect(status.innerHTML).toBe('Next player: X');

  fireEvent.click(buttons[0]);
  expect(status.innerHTML).toBe('Next player: O');

  fireEvent.click(buttons[1]);
  expect(status.innerHTML).toBe('Next player: X');
});

test('status locks after winning move is made', () => {
  const board = render(<Board initialSquares={Array(9).fill(null)} />);
  const status = board.getByText('Next player', {exact: false});
  const buttons = board.queryAllByRole('button');

  expect(status.innerHTML).toBe('Next player: X');

  fireEvent.click(buttons[5]);
  expect(status.innerHTML).toBe('Next player: O');

  fireEvent.click(buttons[4]);
  expect(status.innerHTML).toBe('Next player: X');

  fireEvent.click(buttons[2]);
  expect(status.innerHTML).toBe('Next player: O');

  fireEvent.click(buttons[6]);
  expect(status.innerHTML).toBe('Next player: X');

  // game winning move
  fireEvent.click(buttons[8]);
  expect(status.innerHTML).toBe('Next player: O');

  // moves after should not register, even if an empty space
  fireEvent.click(buttons[0]);
  expect(status.innerHTML).toBe('Next player: O');
});

test('status does not alternate on repeated square', () => {
  const board = render(<Board initialSquares={Array(9).fill(null)} />);
  const status = board.getByText('Next player', {exact: false});
  const buttons = board.queryAllByRole('button');

  expect(status.innerHTML).toBe('Next player: X');

  fireEvent.click(buttons[0]);
  expect(status.innerHTML).toBe('Next player: O');

  fireEvent.click(buttons[0]);
  expect(status.innerHTML).toBe('Next player: O');
});
