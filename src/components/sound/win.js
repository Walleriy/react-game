import React from "react";
import Sound from "react-sound";
import win from "./victory-sound.mp3"

const WinSound = () => {
    return (
        <Sound
            url={win}
            playStatus={Sound.status.PLAYING}
        />
    );
}

export default WinSound;
