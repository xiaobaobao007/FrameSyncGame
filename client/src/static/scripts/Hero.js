function Hero() {
    this.width = HERO_HEIGHT - 10;
    this.x = CANVAS_WIDTH / 2;
    this.y = BALL_HEIGHT + this.width + 7;

    this.gun = new Gun();

    this.init = function () {
        this.gun.reset(this.x, this.y, 200, 200);
    };

    this.draw = function () {
        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, Math.PI, 2 * Math.PI);
        ctx.fill();

        this.gun.draw();
    };

    this.update = function (now) {
        let closeBall = findCloseOne();
        this.gun.reset(this.x, this.y, closeBall.x, closeBall.y);
        this.gun.update(now);
    };

}

function heroInit() {
    hero = new Hero();
    hero.init();
}

function paintHero() {
    ctx.fillStyle = "#388372";
    ctx.fillRect(0, CANVAS_HEIGHT - HERO_HEIGHT, CANVAS_WIDTH, 5);

    hero.draw();
}

function updateHero(now) {
    hero.update(now);
}