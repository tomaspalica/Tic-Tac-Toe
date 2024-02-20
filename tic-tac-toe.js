const cells = document.querySelectorAll('.cell');
let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function playerTurn(cellIndex) {
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }
  gameBoard[cellIndex] = currentPlayer;
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  console.log(gameBoard);
}

function cellClicked(e) {
  const clickedCell = e.target;
  console.log(clickedCell);
  const cellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }
  playerTurn(cellIndex);
}

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});
