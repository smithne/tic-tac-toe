const gameboard = (() => {
    const blankBoard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    let moves = blankBoard;

    const getBoard = () => moves;

    const makeMove = (x, y, player) => {
        if (moves[y][x] != " ") {
            return false;
        } else {
            moves[y][x] = player.label;
            return moves;
        }
    }

    return {
        getBoard,
        makeMove
    };
})();

const playerFactory = (label) => {
    return {label};
};

const p1 = playerFactory('x');
const p2 = playerFactory('o');