export default class LocalStorage {
    getGameState = () => {
        if (localStorage.getItem('.game-state') === null) {
            return {
                history: [{
                    squares: Array(9).fill(null),
                }],
                stepNumber: 0,
                xIsNext: true
            }
        } else {
            return JSON.parse(localStorage.getItem('.game-state'));
        }
    };

    setGameState = (state) => {
        localStorage.setItem('.game-state', JSON.stringify(state));
    };
}
