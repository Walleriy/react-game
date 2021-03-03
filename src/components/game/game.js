import React from "react";
import './game.css'
import Board from "../board";
import KeyboardEvent from "../keyboardEvent";
import WinSound from "../sound/win";
import MoveSound from "../sound/move";
import DrawSound from "../sound/draw";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    movesHistory (history) {
        return  history.map((step, move) => {
            const description = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            );
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = this.movesHistory(history);

        let status;
        let sound;
        if(this.state.stepNumber !== 0) {
            sound = <MoveSound />
        }

        let clazz = 'game ';
        if (winner) {
            status = 'Winner: ' + winner;
            sound = <WinSound />
        } else if (current.squares.filter(value => value === null).length === 0) {
            status = "Draw!";
            sound = <DrawSound />
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            clazz = clazz   + (this.state.xIsNext ? 'game__player-x' : 'game__player-y');
        }


        return (
            <div className={clazz}>
                {sound}

                <div className="game__player">
                    <KeyboardEvent
                        onClick={this.handleClick}
                    />
                    {status}
                </div>
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <div className="game__info">
                    <ol>{moves}</ol>
                </div>

            </div>
        );
    }
}
