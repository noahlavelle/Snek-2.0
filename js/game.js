class food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 6;
        this.moveDir = [0, 0]
    }
}

class game {
    constructor() {
        this.snake = new snake(0, 0);
        this.food = new food(...this.makeFoodCoords());
        let started = false;
        this.tick ? tick : null;
    }

    if (started = false) {
        Node.addEventListner('keydown', function (event) {
            started = true;
        });
    }

    makeFoodCoords() {
        return Math.floor(Math.random(0, 50));
    }


    tick() {
        if (snake.x === food.x & snake.y === food.y) {
            snake.length++;
            this.food = new food(...this.makeFoodCoords());
        }

        Node.addEventListner('keydown', function (event) {
            const key = event.key;
            switch (key) {
                case "w":
                    snake.moveDir = [0, 1];
                    break
                case "a":
                    snake.moveDir = [-1, 0];
                    break
                case "s":
                    snake.moveDir = [0, -1];
                    break
                case "d":
                    snake.moveDir = [1, 0];
                    break
            }

            snake.x = snake.x + snake.moveDir[0];
            snakexy = snake.y + snake.moveDir[1];
            render(food.x, food.y, white);
            render(snake.x, snake.y, blue);

        });
    }

}