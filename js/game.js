//canvas setup
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
    game.snake.length = 6;
    game.snake.x = w / 2;
    game.snake.y = h / 2;
    game.snake.moveDir = [0, 0]
    game.food = new Food(game, game.makeFoodCoords(), game.makeFoodCoords());
}

function text(text, line) {

}

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
        this.length = 6;
        this.moveDir = [0, 0];
        this.tail = [
        ]
    }
}

function keyPress(event) {
    switch (String.fromCharCode(event.which)) {
        case "a":
            this.snake.moveDir = [-1, 0]
            break;
        case "d":
            this.snake.moveDir = [1, 0]
            break;
        case "w":
            this.snake.moveDir = [0, -1]
            break;
        case "s":
            this.snake.moveDir = [0, 1]
            break;
    }
}

class Game {
    constructor() {
        this.food = new Food(this, this.makeFoodCoords(), this.makeFoodCoords());
        this.snake = new Snake(this, w / 2, h / 2);
        let started = false;
        this.tick(this);
        $(document).keypress(keyPress.bind(this));
    }

    if (started = false) {
        Node.addEventListner('keydown', function (event) {
            started = true;
        });
    }

    makeFoodCoords() {
        let coords = Math.round((Math.floor(Math.random() * 750)) / 30) * 30;
        if (coords < 0 || coords > 750) {
            this.makeFoodCoords()
        } else {
            return coords;
        }
    }


    tick() {
        if (this.snake.x === this.food.x & this.snake.y === this.food.y) {
            this.snake.length++;
            this.food = new Food(this, this.makeFoodCoords(), this.makeFoodCoords());
        }

        if (this.snake.x < 0) {
            this.snake.length = this.snake.length - 3;
            this.snake.tail.splice(this, 3);
            this.snake.moveDir = [1, 0]
        } else if (this.snake.x > 750) {
            this.snake.length = this.snake.length - 3;
            this.snake.tail.splice(this, 3);
            this.snake.moveDir = [-1, 0]
        } else if (this.snake.y < 0) {
            this.snake.length = this.snake.length - 3;
            this.snake.tail.splice(this, 3);
            this.snake.moveDir = [0, 1]
        } else if (this.snake.y > 750) {
            this.snake.length = this.snake.length - 3;
            this.snake.tail.splice(this, 3);
            this.snake.moveDir = [0, -1]
        }

        if (this.snake.length <= 0) {
            end(this)
        }

        this.snake.x = Math.round((this.snake.x + this.snake.moveDir[0] * gridsize) / 30) * 30;
        this.snake.y = Math.round((this.snake.y + this.snake.moveDir[1] * gridsize) / 30) * 30;

        this.snake.tail.push([ this.snake.x, this.snake.y ]);
        if (this.snake.tail.length > this.snake.length + this.snake.length - 6) {
            this.snake.tail.shift();
        }


        clear()

        for (const tailItem of this.snake.tail) {
            draw(tailItem[0], tailItem[1], $('#btn-single').css('background-color'));
        }
        draw(this.food.x, this.food.y, '#fff');
        //draw(this.snake.x, this.snake.y, $('#btn-single').css('background-color'));
        setTimeout(() => {
            this.tick()
        }, Math.max(1000 / ((this.snake.length + 3) * 2), 1000 / 30));
    }
}