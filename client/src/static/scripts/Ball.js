function Ball() {

    this.init = function () {
        this.radius = 11;
        this.x = this.radius + random.random(CANVAS_WIDTH - this.radius * 2)
        this.y = -this.radius * 2;
        this.color = `rgb(${random.random(256)},${random.random(256)},${random.random(256)})`;
        this.speed = random.random(15) * 0.1 + 0.1;
        this.hp = 2;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
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

function findCloseOne() {
    let b = null;
    for (let ball of balls) {
        if (b == null || b.y < ball.y) {
            b = ball;
        }
    }
    return b;
}