import KeyboardEventHandler from "react-keyboard-event-handler";
import React from "react";

const convertNumKeyboard = (number) => {
    number = number - 1;
    if (number > -1 && number < 3) {
        return number + 6;
    } else if (number > 5 && number < 9) {
        return number - 6;
    } else {
        return number;
    }
}

const KeyboardEvent = (props) => (
    <div>
    <KeyboardEventHandler
        handleKeys={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        onKeyEvent={(key) => props.onClick(convertNumKeyboard(key))}
    />
</div>);

export default KeyboardEvent;
