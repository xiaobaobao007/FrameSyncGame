function Gun() {
    this.x = 0;
    this.y = 0;

    this.targetX = CANVAS_WIDTH / 2;
    this.targetY = CANVAS_HEIGHT / 2;

    this.speed = 0.05;

    this.speedX = 0;
    this.speedY = 0;

    this.width = HERO_HEIGHT * 0.5;

    this.bulletArray = [];

    this.lastShootTime = 0;
    this.shootTime = 500;

    this.reset = function (x_, y_, tx_, ty_) {
        this.x = x_;
        this.y = y_;

        let t = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2));
        let rate = t / this.width;

        this.targetX = x_ + (tx_ - x_) / rate;
        this.targetY = y_ + (ty_ - y_) / rate;

        this.speedX = (this.targetX - this.x) * this.speed;
        this.speedY = (this.targetY - this.y) * this.speed;
    };

    this.draw = function () {
        ctx.strokeStyle = "rgb(44,82,163)";
        ctx.lineWidth = 10;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.targetX, this.targetY)
        ctx.stroke()
        ctx.closePath();

        for (const bullet of this.bulletArray) {
            bullet.draw();
        }
    };

    this.update = function (now) {
        if (this.lastShootTime <= now) {
            this.lastShootTime = now + this.shootTime;
            let bullet = new Bullet();
            bullet.init(this.x, this.y, this.speedX, this.speedY);
            this.bulletArray.push(bullet);
        }

        for (const bullet of this.bulletArray) {
            bullet.updateBullet();
        }
    };
}