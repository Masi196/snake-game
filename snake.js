const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let direction = 'RIGHT';
let food = { x: 300, y: 300 };

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20);
    });
}

function moveSnake() {
    const head = { ...snake[0] };
    if (direction === 'UP') head.y -= 20;
    if (direction === 'DOWN') head.y += 20;
    if (direction === 'LEFT') head.x -= 20;
    if (direction === 'RIGHT') head.x += 20;

    // Boundary check
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert("Game Over!");
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
    setTimeout(gameLoop, 100);
}

placeFood();
gameLoop();



