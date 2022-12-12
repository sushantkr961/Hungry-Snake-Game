let blocksize = 20; // square=25*25mm (1unit=25mm)
let rows = 25;
let cols = 25;
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

// snake body
let snakeBody = [];

// game over
let gameOver = false;

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
  // if game over we want to stop updating the canvas,we want to stop the drawing once game is over
  if (gameOver) {
    return;
  }

  // board colour and size
  context.fillStyle = "lime";
  context.fillRect(0, 0, board.width, board.height);

  //food color and position
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blocksize, blocksize);

  // when snake touches the food
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    foodPlaceChange();
  }

  // for changing the snake length after eating the food
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  // after above loop this run because it tells the head eat and go back and add after the tail
  // starting from the end and we're having each segment move forward to where the previous segment was
  // finally the second segment to take the head's place over here,
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  } // now the body is moving with head

  // position and color of snake
  context.fillStyle = "blue";
  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;
  context.fillRect(snakeX, snakeY, blocksize, blocksize);

  // when we do this for knowing the where snake eat food but it doesn't increase the snake length
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
  }

  // game over conditions
  // 1. if snake touches or want to cross the board
  if (
    snakeX < 0 ||
    snakeX > cols * blocksize ||
    snakeY < 0 ||
    snakeY > rows * blocksize
  ) {
    gameOver = true;
    alert("Game Over");
    location.reload();
  }

  // 2. if snake touches or eats his own body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
      location.reload();
    }
  }
}

function changeDirection(event) {
  // event.key for key event
  if (event.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function foodPlaceChange() {
  foodX = Math.floor(Math.random() * cols) * blocksize;
  foodY = Math.floor(Math.random() * rows) * blocksize;
}
