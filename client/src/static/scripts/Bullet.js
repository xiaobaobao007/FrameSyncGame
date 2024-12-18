function Bullet() {
    this.init = function (x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;

        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        this.radius = random.random(5) + 3;

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
}