function barriers(game, action, length, damageAmount) {
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
                damage(game, damageAmount);
                invun(game);
            } else if (game.snake.x > w) {
                game.snake.moveDir = [-1, 0];
                damage(game, damageAmount);
                invun(game);
            } else if (game.snake.y > h) {
                game.snake.moveDir = [0, -1];
                damage(game, damageAmount);
                invun(game);
            } else if (game.snake.y < 0) {
                game.snake.moveDir = [0, 1];
                damage(game, damageAmount);
                invun(game);
            }
            break;
        case "Rebound":
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

function damage(game, damageAmount) {
    game.snake.length = game.snake.length - damageAmount;
    game.snake.tail.splice(0, damageAmount);
}

function tailCollide(game, action, length, damageAmount) {
    switch (action) {
        case "Kill":
            end(game, length);
            break;
        case "Damage":
            damage(game, damageAmount);
            invun(game);
            break;
    }
}

function invun(game) {
    game.tailCollision = false;
    setInterval(() => {
        game.tailCollision = true;;
    }, 3000);
}