function Hero() {
    this.init = function () {
        this.width = HERO_HEIGHT - 10;
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT * 5 / 6;

        this.gun = new Gun();
        this.gun.init(2);
        this.gun.reset(this.x, this.y, 200, 200);
        this.score = 0;
    };

    this.draw = function () {
        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fill();

        this.gun.draw();

        ctx.font = '30px 宋体';
        ctx.fillStyle = "#0d3dff";
        ctx.textBaseline = 'top';
        ctx.textAlign = 'end';
        ctx.fillText("分数：" + this.score, CANVAS_WIDTH, 0);
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

function heroMove(x, y) {
    hero.x = x;
    hero.y = y;
}

function paintHero() {
    hero.draw();
}

function updateHero(now) {
    hero.update(now);
}