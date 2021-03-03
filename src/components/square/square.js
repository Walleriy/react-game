import React from "react";
import './square.scss'

const convertNumKeyboard = (number) => {
    number = number + 1;
    if (number > 0 && number < 4) {
        return number + 6;
    } else if (number > 6 && number < 10) {
        return number - 6;
    } else {
        return number;
    }
}

const Square = (props) => {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
            <span className="square__key">{convertNumKeyboard(props.id)}</span>
        </button>
    );
}

export default Square;
