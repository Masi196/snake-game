let score = 0;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [];
let direction = "RIGHT";
let food = {};
let gameInterval;

// Start or restart game
function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;

    placeFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Keyboard controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

// Food position
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Draw snake
function drawSnake() {
    ctx.fillStyle = "lime";

    snake.forEach(part => {
        ctx.beginPath();
ctx.arc(part.x + box / 2, part.y + box / 2, box / 2, 0, 2 * Math.PI);
ctx.fill();
    });
}

// Draw food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();

    let head = {
        x: snake[0].x,
        y: snake[0].y
    };
    ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Score: " + score, 10, 25);

    // Movement
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Wall collision
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        clearInterval(gameInterval);

        setTimeout(() => {
            alert("Game Over!");
            startGame();
        }, 10);

        return;
    }

    // Add new head
    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
} else {
    snake.pop();
}

    drawSnake();
}

// Start game first time
startGame();
