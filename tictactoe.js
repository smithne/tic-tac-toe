const playerFactory = (label) => {
    return {label};
};

const gameBoard = (() => {
    let moves = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    
    let players = [];
    let currentPlayer = null;
    let winner = null;

    const clearBoard = () => {
        for (let i = 0; i < moves.length; i++) {
            for (let j = 0; j < moves[i].length; j++) {
                moves[i][j] = ' ';
            }
        }
    }

    const newGame = (player1, player2) => {
        console.log("triggering new game");
        players = [player1, player2];
        currentPlayer = players[0];
        console.log(currentPlayer);
        clearBoard();
        console.log(moves);
        drawBoard(moves);
    }

    const getBoard = () => moves;

    const makeMove = (x, y) => {
        if (moves[y][x] != " ") {
            return false;
        } else {
            moves[y][x] = currentPlayer.label;
            drawBoard(gameBoard.getBoard());
            winner = checkWinner(currentPlayer);
            if (!winner) {
                currentPlayer = (currentPlayer == players[0]) ? players[1] : players[0];
            } else {
                console.log(`Player ${currentPlayer.label} wins!`);
            }
        }
    }

    const checkWinner = (player) => {
        // check row win
        for (let i = 0; i<=2; i++) {
            if ((moves[i][0] == player.label) && (moves[i][1] == player.label)
                && (moves[i][2] == player.label)) {
                    return player;
            }
        }

        // check column win
        for (let i = 0; i<=2; i++) {
            if ((moves[0][i] == player.label) && (moves[1][i] == player.label)
                && (moves[2][i] == player.label)) {
                    return player;
            }
        }

        // check diagonals
        if (((moves[0][0] == player.label) && (moves[1][1] == player.label)
            && (moves[2][2] == player.label)) || ((moves[2][0] == player.label)
            && (moves[1][1] == player.label) && (moves[0][2] == player.label))) {
                return player;
        }
        console.log("no winner this turn");
        return null;
    }

    return {
        getBoard,
        makeMove,
        currentPlayer,
        players,
        winner,
        newGame
    };
})();


const clickSquare = (e) => {
    cellId = e.target.id;
    cellX = cellId[cellId.length-1];
    cellY = cellId[cellId.length-2];
    gameBoard.makeMove(cellX,cellY);
}

const drawBoard = (board) => {
    let gridContainer = document.querySelector('#board');
    gridContainer.innerHTML = "";

    gridContainer.style.gridTemplateRows = `20vw 20vw 20vw`;
    gridContainer.style.gridTemplateColumns = `20vw 20vw 20vw`;
    gridContainer.style.width = `40%`

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            let gridItem = document.createElement('div');
            gridItem.classList.add('gameSquare');
            gridItem.id = "square" + i + j;
            gridItem.innerText = board[i][j];
            gridContainer.append(gridItem);
        }
    }

    let squares = document.querySelectorAll('.gameSquare');

    squares.forEach((cell) => {
        cell.addEventListener('click', clickSquare);
    });
}

const p1 = playerFactory('x');
const p2 = playerFactory('o');

const reset = () => {
    gameBoard.newGame(p1,p2);
}

newGameBtn = document.querySelector('#newGameBtn');
newGameBtn.addEventListener('click', reset);

gameBoard.newGame(p1,p2);