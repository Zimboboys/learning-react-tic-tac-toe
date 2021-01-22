import React, { useState } from 'react';
import Square from './Square';
import Banner from './Banner';
import { calculateWinner } from './helpers';

export default function Board() {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ winner, setWinner ] = useState(null);
  const [ xIsNext, setXIsNext ] = useState(true);

  const handleClick = (i) => {
    if (winner) return;

    const squareCopy = squares.slice();
    squareCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squareCopy);
    setWinner(calculateWinner(squareCopy));
    setXIsNext(!xIsNext);
  }

  const renderSquare = (i) => {
    return <Square
      value={squares[i]}
      onClick={() => handleClick(i)} />
  };

  return (
    <div>
      <div className="status">{`Next player: ${xIsNext ? 'X' : 'O'}`}</div>
      {
        winner ? <Banner name={winner} /> : null
      }
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
