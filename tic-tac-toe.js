const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
// indexes of gameBoard that when achived wins you the game
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
// -----------------------------------------------------
// anounce winner and announceDraw are functions that type above the game who wone after conditions are met in function checkForWinOrDraw
function announceWinner(player) {
  const message = document.getElementById('gameMessage');
  message.innerText = `Player ${player} wins`;
}
function announceDraw() {
  const message = document.getElementById('gameMessage');
  message.innerText = `DRAW!`;
}
// ---------------------------------------------------
// checks if any player has won or the game ended in a Draw.
//  By using loop FOR this function iterates through  array winConditions and copies the value of an array into [a,b,c] array
// then by using IF, function checks indexes of array gameBoard. if they are the same function changes roundWOn to true, shows who won and stops the game.
// if no win conditions were met fucntion anounces a draw and ends the game
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
// every time player clicks on cell ,function checks if the cell is already clicked if is not ,function attributes players value to gamBoard index that coresponds with clicked cell
// in the end function changes curentsPlayer value

function playerTurn(cellIndex) {
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }
  gameBoard[cellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
}
// updates cells with players value
function updateUI(cellIndex) {
  cells[cellIndex].innerHTML = gameBoard[cellIndex];
}
// gets clicked cell gets the cells number and calls playerTurn and updateUI
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
// resets the game by reseting fundamental variables to their original form, cells and game message innerText gets replaced by empty string
function resetGame() {
  currentPlayer = 'O';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => {
    cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
}

resetButton.addEventListener('click', resetGame);
