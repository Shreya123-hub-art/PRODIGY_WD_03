const board = document.getElementById('board');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],  // rows
  [0,3,6],[1,4,7],[2,5,8],  // columns
  [0,4,8],[2,4,6]           // diagonals
];

function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.dataset.index = index;
    cellDiv.innerText = cell || '';
    cellDiv.addEventListener('click', handleCellClick);
    board.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    createBoard();
  }
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      alert(`${gameState[a]} wins!`);
      gameActive = false;
      return;
    }
  }
  if (!gameState.includes(null)) {
    alert("It's a draw!");
    gameActive = false;
  }
}

restartBtn.addEventListener('click', () => {
  gameState = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
});

createBoard();
