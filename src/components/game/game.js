import React from "react";
import './game.css'
import Board from "../board";
import KeyboardEvent from "../keyboardEvent";
import WinSound from "../sound/win";
import MoveSound from "../sound/move";
import DrawSound from "../sound/draw";
import LocalStorage from "../../services/localStorage";
import ArtificialIntelligence from "../../services/artificial-intelligence";

export default class Game extends React.Component {
    localStorage1 = new LocalStorage();
    ai = new ArtificialIntelligence('X');

    constructor(props) {
        super(props);
        this.state = this.localStorage1.getGameState();
    }

    handleClick = (i, player = 'user') => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.detectWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        if(player === 'user') {
            const move = this.ai.minimax(squares, 'O').index;
            console.log(move);
            squares[move] = this.state.xIsNext ? 'O' : 'X';
        }

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            //xIsNext: !this.state.xIsNext
        });
        this.setState((state) => {
            this.localStorage1.setGameState(state);
        })
    }

    detectWinner = (squares) => {
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

    isPlayerWinner = (board) => {
        const player = 'X';
        if(
            (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[0] === player && board[4] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player)
        ) {
            return true;
        } else {
            return false;
        }
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
        const isVictory = this.detectWinner(current.squares);
        let winner = false;
        if (isVictory) {
            winner = this.isPlayerWinner(current.squares);
        }

        const moves = this.movesHistory(history);

        let status;
        let sound;
        if(this.state.stepNumber !== 0) {
            sound = <MoveSound />
        }

        let clazz = 'game ';
        if (isVictory) {
            status = winner ? 'You win!' : 'You lose';
            sound = winner ? <WinSound /> : <DrawSound />;
        } else if (current.squares.filter(value => value !== 'X' && value !== 'O').length === 0) {
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
