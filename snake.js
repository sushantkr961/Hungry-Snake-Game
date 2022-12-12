let blocksize = 25;
let rows = 20;
let cols = 20;
let board, context;

// Snake head
let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

// food
let foodX;
let foodY;

// speed of snake
let velocityX = 0;
let velocityY = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blocksize;
  board.width = cols * blocksize;
  context = board.getContext("2d"); // used for drawing on the board

  foodPlaceChange();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / 10); // 100ms
};

function update() {
  // board colour and size
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  //food color and position
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blocksize, blocksize);

  // when snake touches the food
  if (snakeX == foodX && snakeY == foodY) {
    ch;
  }
  // position and color of snake
  context.fillStyle = "lime";
  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;
  context.fillRect(snakeX, snakeY, blocksize, blocksize);
}

function foodPlaceChange() {
  foodX = Math.floor(Math.random() * rows) * blocksize;
  foodY = Math.floor(Math.random() * cols) * blocksize;
}

function changeDirection(event) {
  // event.key for key event
  if (event.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (event.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (event.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (event.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
}
