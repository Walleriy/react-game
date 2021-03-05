export default class ArtificialIntelligence {
    constructor(player) {
        this.huPlayer = player;

        if (player === 'X') {
            this.aiPlayer = 'O'
        } else {
            this.aiPlayer = 'X'
        }
    }

    _ReactBoardToLogicBoard = (board) => {
        return board.map((element, id) => {
            if (element === 'X' || element === 'O') {
                return element;
            } else {
                return id;
            }
        });
    }

    _emptyCells = (board) => {
        return board.filter(s => s !== "O" && s !== "X");
    }

    _winner = (board, player) => {
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

    minimax = (newBoard, player) => {

        const workingBoard = this._ReactBoardToLogicBoard(newBoard);
        const emptyCells = this._emptyCells(workingBoard);

        if (this._winner(workingBoard, this.huPlayer)){
            return {score:-10};
        }
        else if (this._winner(workingBoard, this.aiPlayer)){
            return {score:10};
        }
        else if (emptyCells.length === 0){
            return {score:0};
        }


        const moves = [];

        for (let i = 0; i < emptyCells.length; i++){
            const move = {};
            move.index = workingBoard[emptyCells[i]];

            workingBoard[emptyCells[i]] = player;

            if (player === this.aiPlayer){
                const result = this.minimax(workingBoard, this.huPlayer);
                move.score = result.score;
            }
            else{
                const result = this.minimax(workingBoard, this.aiPlayer);
                move.score = result.score;
            }

            workingBoard[emptyCells[i]] = move.index;

            moves.push(move);
        }


        let bestMove;
        if (player === this.aiPlayer){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

}
