const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const themeBtn = document.querySelector("#theme-btn");
const statusText = document.querySelector("#status");

const clickSound = document.querySelector("#click-sound");
const winSound = document.querySelector("#win-sound");
const drawSound = document.querySelector("#draw-sound");

let turnO = true;
let count = 0;
let gameOver = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const checkWinner = () => {
  for (let p of winPatterns) {
    const [a,b,c] = p;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      statusText.innerText = `Player ${boxes[a].innerText} wins! Great move!`;
      winSound?.play();
      gameOver = true;
      return true;
    }
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    clickSound?.play();

    if (turnO) {
      box.innerText = "O";
      box.classList.add("o-color");
      statusText.innerText = "Player X's turn";
    } else {
      box.innerText = "X";
      box.classList.add("x-color");
      statusText.innerText = "Player O's turn";
    }

    box.disabled = true;
    count++;

    if (checkWinner()) return;

    if (count === 9) {
      statusText.innerText = "It's a draw! Well played both.";
      drawSound?.play();
      gameOver = true;
      return;
    }

    turnO = !turnO;
  });
});

const resetGame = () => {
  turnO = true;
  count = 0;
  gameOver = false;
  statusText.innerText = "Player O's turn";
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("x-color", "o-color");
  });
};

resetBtn.onclick = resetGame;