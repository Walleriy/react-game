import React from "react";
import Sound from "react-sound";
import win from "./move.wav"

const MoveSound = () => {
    return (
        <Sound
            url={win}
            playStatus={Sound.status.PLAYING}
            playFromPosition={10}
        />
    );
}

export default MoveSound;
