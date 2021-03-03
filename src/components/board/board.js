import React from 'react'
import Square from "../square";
import './board.css'

export default class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                id = {i}
            />
        );
    }

    createBoard (rowsNumber, elementsNumber) {
        const rows = []

        for (let row = 0; row < rowsNumber; row++) {
            const elements = []

            for (let element = 0; element < elementsNumber; element++) {
                elements.push(this.renderSquare(row*elementsNumber + element))
            }
            rows.push((
                <div className="board__row">
                    {elements}
                </div>
            ))
        }

        return rows;
    }

    render() {

        return (
            <div className="board">
                {this.createBoard(3, 3)}
            </div>
        )
    }
}
