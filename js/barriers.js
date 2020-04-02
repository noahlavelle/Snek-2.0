function barriers(game, action, length) {
    switch (action) {
        case "Kill":
            end(game, length);
            break;
        case "Link":
            if (game.snake.x < 0) {
                game.snake.x = w;
            } else if (game.snake.x > w) {
                game.snake.x = 0
            } else if (game.snake.y > h) {
                game.snake.y = 0;
            } else if (game.snake.y < 0) {
                game.snake.y = h;
            }
            break;
        case "Rebound & Damage":
            if (game.snake.x < 0) {
                game.snake.moveDir = [1, 0];
                invun(game);
            } else if (game.snake.x > w) {
                game.snake.moveDir = [-1, 0];
                invun(game);
            } else if (game.snake.y > h) {
                game.snake.moveDir = [0, -1];
                invun(game);
            } else if (game.snake.y < 0) {
                game.snake.moveDir = [0, 1];
                invun(game);
            }
            break;
    }
}

function tailCollide(game, action, length) {
    switch (action) {
        case "Kill":
            end(game, length);
            break;
        case "Damage":
            game.snake.length - 6;
            game.snake.tail.splice(this, 6);
            invun(game);
            break;
    }
}

function invun(game) {
    game.tailCollision = false;
    game.snakeColor = '#fff';
    setInterval(() => {
        game.tailCollision = true;
        game.snakeColor = $('#btn-single').css('background-color');    
    }, 3000);
}