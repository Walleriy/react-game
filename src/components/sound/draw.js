import React from "react";
import Sound from "react-sound";
import win from "./draw.wav"

const DrawSound = () => {
    return (
        <Sound
            url={win}
            playStatus={Sound.status.PLAYING}
        />
    );
}

export default DrawSound;
