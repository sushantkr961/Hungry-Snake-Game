const board = document.querySelector("#board");
const currentScore = document.querySelector("#score");
const highestScore = document.querySelector("#high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 5;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highestScore.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
  // Passing a random 1 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  // Clearing the timer and reloading the page on game over
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
};

const changeDirection = (e) => {
  // Changing velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirection({ key: button.dataset.key })
  )
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Checking if the snake hit the food
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
    score++; // increment score by 1
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    currentScore.innerText = `Score: ${score}`;
    highestScore.innerText = `High Score: ${highScore}`;
  }
  // Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  // Shifting forward the values of the elements in the snake body by one
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

  // Checking if the snake's head is out of wall, if so setting gameOver to true
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  for (let i = 0; i < snakeBody.length; i++) {
    // Adding a div for each part of the snake's body
    html += `<div class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // Checking if the snake head hit the body, if so set gameOver to true
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  // console.log(board);
  board.innerHTML = html;
};

let snakeSpeed = 120;
// let speed = document.getElementById("speed");
// speed.addEventListener("change", () => {
//   let selected = document.getElementById("speed").value;
//   console.log(selected);
//   if (selected == "normal") {
//     snakeSpeed = 120;
//   }
//   if (selected == "hard") {
//     snakeSpeed = 60;
//   }
//   if (selected == "easy") {
//     snakeSpeed = 240;
//   }
// });

updateFoodPosition();
// speed of the snake is 100, it will move snake after every 100ms
setIntervalId = setInterval(initGame, snakeSpeed);
// event on keypress on the keyboard
document.addEventListener("keyup", changeDirection);
