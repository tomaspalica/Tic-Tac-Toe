const cells = document.querySelectorAll('.cell');
let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function announceWinner(player) {
  const message = document.getElementById('gameMessage');
  message.innerText = `Player ${player} wins`;
}
function announceDraw() {
  const message = document.getElementById('gameMessage');
  message.innerText = `DRAW!`;
}

function checkForWinOrDraw() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    announceWinner(currentPlayer);
    gameActive = false;
    return;
  }
  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}
function playerTurn(cellIndex) {
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }
  gameBoard[cellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  console.log(gameBoard);
}
function updateUI(cellIndex) {
  cells[cellIndex].innerHTML = gameBoard[cellIndex];
}

function cellClicked(e) {
  const clickedCell = e.target;
  console.log(clickedCell);
  const cellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }
  playerTurn(cellIndex);
  updateUI(cellIndex);
}

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});
