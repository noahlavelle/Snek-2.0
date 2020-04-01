let keyPressed;

class Food {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
    }

}

class Snake {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.length = 4;
        this.moveDir = [0, 0];
        this.tail = []
    }
}

function keyPress(event) {
    if (keyPressed !== true) {
        switch (String.fromCharCode(event.which)) {
            case "a":
                if (this.snake.moveDir[0] !== 1) {
                    this.snake.moveDir = [-1, 0];
                }
                break;
            case "d":
                if (this.snake.moveDir[0] !== -1) {
                    this.snake.moveDir = [1, 0];
                }
                break;
            case "w":
                if (this.snake.moveDir[1] !== 1) {
                    this.snake.moveDir = [0, -1];
                }
                break;
            case "s":
                if (this.snake.moveDir[1] !== -1) {
                    this.snake.moveDir = [0, 1];
                }
                break;
        }
        keyPressed = true;
    }
}

class Game {
    constructor() {
        this.food = new Food(this, this.makeFoodCoords(canvas.width), this.makeFoodCoords(canvas.height));
        this.snake = new Snake(this, w / 2, h / 2);
        this.snakeColor = $('#btn-single').css('background-color');
        this.started = false;
        this.tick(this);
        $(document).keypress(keyPress.bind(this));
    }

    if (started = false) {
        Node.addEventListner('keydown', function (event) {
            started = true;
        });
    }

    makeFoodCoords(baseParam) {
        let coord = Math.round((Math.floor(Math.random() * baseParam - 20)) / 30) * 30;
        return coord;
    }


    tick() {
        if (this.snake.x === this.food.x & this.snake.y === this.food.y) {
            this.snake.length++;
            this.food = new Food(this, this.makeFoodCoords(canvas.width), this.makeFoodCoords(canvas.height));
        }

        if (this.snake.x < 0) {
            this.snake.length = this.snake.length - 6;
            this.snake.tail.splice(this, 6);
            this.snake.moveDir = [1, 0]
        } else if (this.snake.x > w) {
            this.snake.length = this.snake.length - 6;
            this.snake.tail.splice(this, 6);
            this.snake.moveDir = [-1, 0]
        } else if (this.snake.y < 0) {
            this.snake.length = this.snake.length - 6;
            this.snake.tail.splice(this, 3);
            this.snake.moveDir = [0, 1]
        } else if (this.snake.y > h) {
            this.snake.length = this.snake.length - 6;
            this.snake.tail.splice(this, 6);
            this.snake.moveDir = [0, -1]
        }

        if (this.started == false && keyPressed) {
            setTimeout(() => {
                this.started = true;
            }, 1000);
        }

        for (let i = 1; i < this.snake.tail.length; i++) {
            if (this.started && this.snake.tail[0][0] == this.snake.tail[i][0] && this.snake.tail[0][1] == this.snake.tail[i][1]) {
                this.snake.length = this.snake.length - 6;
                this.snake.tail.splice(this, 6);
            }
        }

        if (this.snake.length <= 0) {
            end(this)
        }

        this.snake.tail.push([this.snake.x, this.snake.y]);
        if (this.snake.tail.length > this.snake.length + this.snake.length - 4) {
            this.snake.tail.shift();
        }

        this.snake.x = Math.round((this.snake.x + this.snake.moveDir[0] * gridsize) / 30) * 30;
        this.snake.y = Math.round((this.snake.y + this.snake.moveDir[1] * gridsize) / 30) * 30;

        clear()

        draw(this.food.x, this.food.y, '#fff');
        for (const tailItem of this.snake.tail) {
            draw(tailItem[0], tailItem[1], $('#btn-single').css('background-color'));
        }
        setTimeout(() => {
            this.tick();
            keyPressed = false
        }, Math.max(1000 / ((this.snake.length + 3) * 2), 1000 / 30));
    }
}