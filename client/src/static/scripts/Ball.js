function Ball() {
    this.radius = 11; // 小球半径
    this.x = 0;
    this.y = -this.radius;
    this.color = ``;
    this.speed = 0;
    this.hp = 5;

    this.init = function () {
        this.x = this.radius + random.random(CANVAS_WIDTH - this.radius * 2)
        this.y = -this.radius * 2;
        this.color = `rgb(${random.random(256)},${random.random(256)},${random.random(256)})`;
        this.speed = random.random(15) * 0.1 + 0.1; // 随机下落速度
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.fillText(this.hp, this.x, this.y);
    };

    this.update = function () {
        if (this.y + this.radius >= BALL_HEIGHT) {
            this.y = BALL_HEIGHT - this.radius;
            return;
        }
        this.y += this.speed;
    };
}

function ballInit() {
    balls = [];
    for (let i = 0; i < 10; i++) {
        const ball = new Ball();
        ball.init();
        balls.push(ball);
    }
}

function paintBall() {
    for (let ball of balls) {
        ball.draw();
    }
}

function updateBall() {
    for (let ball of balls) {
        ball.update();
    }
}