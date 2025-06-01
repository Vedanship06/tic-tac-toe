let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function drawBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.innerText = cell;
    cellElement.addEventListener("click", () => handleMove(index));
    boardElement.appendChild(cellElement);
  });
}

function handleMove(index) {
  if (board[index] === "" && !isGameOver) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
    drawBoard();
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      isGameOver = true;
      statusElement.innerText = `${board[a]} wins!`;
    }
  });

  if (!isGameOver && board.every(cell => cell !== "")) {
    statusElement.innerText = "It's a draw!";
    isGameOver = true;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  statusElement.innerText = "";
  drawBoard();
}

drawBoard();
