function Ball() {

    this.init = function () {
        this.radius = 11;
        this.x = this.radius + random.random(CANVAS_WIDTH - this.radius * 2)
        this.y = -this.radius * 2;
        this.color = `rgb(${random.random(256)},${random.random(256)},${random.random(256)})`;
        this.speed = random.random(10) * 0.2 + 0.1;
        this.hp = 2;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.font = '20px 宋体';
        ctx.fillStyle = "white";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(this.hp, this.x, this.y);
    };

    this.update = function () {
        if (this.y + this.radius >= BALL_HEIGHT) {
            this.init();
            hero.score -= 2;
        } else {
            this.y += this.speed;
        }
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