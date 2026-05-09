const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake;
let direction;
let food;
let gameInterval;

function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    placeFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        clearInterval(gameInterval);
        alert("Game Over!");
        startGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }

    drawFood();
    drawSnake();
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

startGame();
