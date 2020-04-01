const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;

const gridsize = 30;

function draw(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridsize, gridsize);
}

function clear() {
    ctx.fillStyle = '#23272a';
    ctx.fillRect(0, 0, w, h);
}

function end(game) {
    game.started = false;
    game.snake.length = 4;
    game.snake.x = w / 2;
    game.snake.y = h / 2;
    game.snake.moveDir = [0, 0]
    game.food = new Food(game, game.makeFoodCoords(canvas.width), game.makeFoodCoords(canvas.height));
    clear();
}

function text(text, line) {

}