class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 4;
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
    constructor() {
        this.food = new Food(this.makeFoodCoords(canvas.width), this.makeFoodCoords(canvas.height));
        this.snake = new Snake(0, 0);
        this.snakeColor = $('#btn-single').css('background-color');
        this.started = false
        this.tick(this);
    }

    makeFoodCoords(baseParam) {
        let coord = Math.round((Math.floor(Math.random() * baseParam - gridSize)) / gridSize) * gridSize;
        if (coord < 0) {
            coord = coord + 30;
        }
        return coord;
    }

    tick() {
        if (this.snake.x === this.food.x & this.snake.y === this.food.y) {
            this.snake.length++;
            this.food = new Food(this.makeFoodCoords(canvas.width), this.makeFoodCoords(canvas.height));
        }

        if (this.snake.x >= w || this.snake.x < 0 ||
            this.snake.y >= h || this.snake.x < 0) {
            end(this)
        }

        if (this.snake.tail.find(e => {
                return e[0] === this.snake.x && e[1] === this.snake.y;
            }) && this.started) {
            end(this)
        }

        if (this.started == false && keyPressed) {
            setTimeout(() => {
                this.started = true;
            }, 1000)
        }


        this.snake.tail.push([this.snake.x, this.snake.y]);
        if (this.snake.tail.length > this.snake.length + this.snake.length - 4) {
            this.snake.tail.shift();
        }

        this.snake.x = Math.round((this.snake.x + this.snake.moveDir[0] * gridSize) / gridSize) * gridSize;
        this.snake.y = Math.round((this.snake.y + this.snake.moveDir[1] * gridSize) / gridSize) * gridSize;

        clear()

        draw(this.food.x, this.food.y, '#fff');
        draw(this.snake.x, this.snake.y, $('#btn-single').css('background-color'))
        for (const tailItem of this.snake.tail) {
            draw(tailItem[0], tailItem[1], $('#btn-single').css('background-color'));
        }

        keyPressed = false;
        setTimeout(() => {
            this.tick();
        }, Math.max(1000 / ((this.snake.length + 3) * 2), 1000 / 30));
    }
}