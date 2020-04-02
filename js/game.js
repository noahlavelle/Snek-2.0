class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Snake {
    constructor(length, x, y) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveDir = [0, 0];
        this.tail = []

        $(document).keypress(event => {
            if (keyPressed == false) {
                switch (event.key) {
                    case "w":
                    case "ArrowUp":
                        if (this.moveDir[1] !== 1) {
                            this.moveDir = [0, -1];
                            keyPressed = true;
                        }
                        break;
                    case "a":
                    case "ArrowLeft":
                        if (this.moveDir[0] !== 1) {
                            this.moveDir = [-1, 0];
                            keyPressed = true;
                        }
                        break;
                    case "s":
                    case "ArrowRight":
                        if (this.moveDir[1] !== -1) {
                            this.moveDir = [0, 1];
                            keyPressed = true;
                        }
                        break;
                    case "d":
                    case "ArrowDown":
                        if (this.moveDir[0] !== -1) {
                            this.moveDir = [1, 0];
                            keyPressed = true;
                        }
                        break;
                }
            }
        });
    }
}

class Game {
    constructor(startingLength, incrementalSpeed, speed, tailCollision, barriersKill, gridSize) {
        this.speed = speed;
        this.incrementalSpeed = incrementalSpeed;
        this.tailCollision = true;
        this.tailCollisionMethod = tailCollision;
        this.gridSize = gridSize;
        this.startingLength = startingLength;
        this.snake = new Snake(startingLength, 0, 0);
        this.snakeColor = $('#btn-single').css('background-color');
        this.started = false;
        this.food = new Food(this.makeFoodCoords(canvas.width), this.makeFoodCoords(canvas.height));
        this.timeout;
        this.barriersKill = barriersKill;
        this.tick(this);
    }

    makeFoodCoords(baseParam) {
        let coord = Math.round((Math.floor(Math.random() * baseParam - this.gridSize)) / this.gridSize) * this.gridSize;
        if (coord < 0) {
            coord = coord + 30;
        }
        return coord;
    }

    tick() {
        if (this.incrementalSpeed) {
            this.timeout = Math.max(1000 / ((this.snake.length + 3) * 2), 1000 / 30)
            this.snake.length++;
            this.snake.length--;
        } else {
            this.timeout = this.speed;
        }

        if (this.snake.x === this.food.x & this.snake.y === this.food.y) {
            this.snake.length++;
            this.food = new Food(this.makeFoodCoords(canvas.width), this.makeFoodCoords(canvas.height));
        }

        if (this.snake.x >= w || this.snake.x < 0 ||
            this.snake.y >= h || this.snake.y < 0) {
                barriers(this, this.barriersKill, this.startingLength);
        }

        if (this.tailCollision && this.snake.tail.find(e => {
                return e[0] === this.snake.x && e[1] === this.snake.y;
            }) && this.started) {
            tailCollide(this, this.tailCollisionMethod, this.startingLength)
        }

        if (this.started == false && keyPressed) {
            setTimeout(() => {
                this.started = true;
            }, 1)
        }


        this.snake.tail.push([this.snake.x, this.snake.y]);
        if (this.snake.tail.length > this.snake.length - 1) {
            this.snake.tail.shift();
        }

        this.snake.x = Math.round((this.snake.x + this.snake.moveDir[0] * this.gridSize) / this.gridSize) * this.gridSize;
        this.snake.y = Math.round((this.snake.y + this.snake.moveDir[1] * this.gridSize) / this.gridSize) * this.gridSize;

        clear()

        draw(this.food.x, this.food.y, this.gridSize, '#fff');
        draw(this.snake.x, this.snake.y, this.gridSize, this.snakeColor)
        for (const tailItem of this.snake.tail) {
            draw(tailItem[0], tailItem[1], this.gridSize, this.snakeColor);
        }

        keyPressed = false;
        setTimeout(() => {
            this.tick();
        }, this.timeout);
    }
}