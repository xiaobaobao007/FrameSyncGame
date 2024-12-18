function initBullet() {
    bulletCacheArray = [];
}

function Bullet() {
    this.init = function (x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;

        this.radius = random.random(30) + 3;

        let speedRate = (40 - this.radius) * 0.003

        this.xSpeed = xSpeed * speedRate;
        this.ySpeed = ySpeed * speedRate;


        this.color = `rgb(${random.random(256)},${random.random(256)},${random.random(256)})`;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.updateBullet = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    this.destroyBullet = function () {
        return this.x < -this.radius || this.x > CANVAS_WIDTH + this.radius || this.y < -this.radius;
    };

    this.crash = function () {
        let crash = false;
        for (const ball of balls) {
            let d = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
            if (d < this.radius + ball.radius) {
                crash = true;
                ball.hp -= 1;
                if (ball.hp <= 0) {
                    ball.init();
                }
            }
        }
        return crash;
    };

}

function createBullet() {
    if (bulletCacheArray.length > 0) {
        return bulletCacheArray.shift();
    }
    return new Bullet();
}

function destroyBullet(bullet) {
    bulletCacheArray.push(bullet);
}