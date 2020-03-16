import React, { Component } from 'react';
import Board from './board';
import { calculateWinner, currentMove } from '../helpers';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [ ...current.squares ];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const { xIsNext } = this.state;
    squares[i] = currentMove(xIsNext);

    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  render() {
    const { history, xIsNext } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner ? `Winner is ${winner}` : `Next player: ${currentMove(xIsNext)}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move.toString()}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
    <div className="game">
      <div className="game-board">
        <Board 
          onClick={this.handleClick}
          squares={current.squares}
          xIsNext={this.state.xIsNext}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
    );
  }
}

export default Game;