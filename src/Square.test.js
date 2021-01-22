import { render, fireEvent } from "@testing-library/react";
import Square from "./Square.js";

test('render empty square if null value', () => {
  const square = render(<Square value={null} />);
  const button = square.getByRole('button');
  expect(button.innerHTML).toBe('');
});

test('render X square if passed as prop', () => {
  const square = render(<Square value={'X'} />);
  const button = square.getByRole('button');
  expect(button.innerHTML).toBe('X');
});

test('ensure onClick is called on click', () => {
  const onClick = jest.fn();
  const square = render(<Square onClick={onClick} />);
  const button = square.getByRole('button');

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
