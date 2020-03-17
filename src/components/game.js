import React, { useState } from 'react';
import Board from './board';
import { calculateWinner, currentMove } from '../helpers';

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0,);
  };
  const handleClick = (i) => {
    const copyHistory = history.slice(0, stepNumber + 1);
    const current = copyHistory[copyHistory.length - 1];
    const squares = [ ...current.squares ];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = currentMove(xIsNext);
    setStepNumber(copyHistory.length);
    setXIsNext(!xIsNext);

    setHistory(copyHistory.concat([{ squares }]));
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const status = winner ? `Winner is ${winner}` : `Next player: ${currentMove(xIsNext)}`;

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move.toString()}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
  <div className="game">
    <div className="game-board">
      <Board 
        onClick={handleClick}
        squares={current.squares}
        xIsNext={xIsNext}/>
    </div>
    <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
    </div>
  </div>
  );
};
