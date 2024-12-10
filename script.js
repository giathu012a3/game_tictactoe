const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = Array(15).fill(null).map(() => Array(15).fill(null));
let gameActive = true;

function createBoard() {
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (gameBoard[row][col] || !gameActive) {
        return;
    }

    gameBoard[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin(row, col)) {
        alert(`Người chơi ${currentPlayer} đã thắng!`);
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(row, col) {
    const directions = [
        [[0, 1], [0, -1]], 
        [[1, 0], [-1, 0]], 
        [[1, 1], [-1, -1]], 
        [[1, -1], [-1, 1]] 
    ];

    for (const direction of directions) {
        let count = 1;

        for (const [dx, dy] of direction) {
            let x = parseInt(row);
            let y = parseInt(col);

            while (true) {
                x += dx;
                y += dy;

                if (x < 0 || x >= 15 || y < 0 || y >= 15 || gameBoard[x][y] !== currentPlayer) {
                    break;
                }
                count++;
            }
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

resetButton.addEventListener('click', () => {
    gameBoard = Array(15).fill(null).map(() => Array(15).fill(null));
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
});

createBoard();