function Hero() {
    this.initHero = function (id, isMe, x, y) {
        this.id = id;
        this.isMe = isMe;
        this.width = HERO_HEIGHT - 10;
        this.x = CANVAS_WIDTH * x / 100;
        this.y = CANVAS_HEIGHT * y / 100;

        this.gun = new Gun();
        this.gun.init(this, 2);
        this.gun.reset(this.x, this.y, 200, 200);
        this.score = 0;
    };

    this.draw = function () {
        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fill();

        this.gun.draw();

        if (this.isMe) {
            ctx.font = '30px 宋体';
            ctx.fillStyle = "#0d3dff";
            ctx.textBaseline = 'top';
            ctx.textAlign = 'end';
            ctx.fillText("分数：" + this.score, CANVAS_WIDTH, 0);
        }

        ctx.font = '20px 宋体';
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(this.id + ":" + this.score, this.x, this.y);
    };

    this.update = function (now) {
        let closeBall = findCloseOne();
        this.gun.reset(this.x, this.y, closeBall.x, closeBall.y);
        this.gun.update(now);
    };
}

function click(x, y) {
    let data = {
        id: hero.id,
        x: x,
        y: y
    }

    sendWsMessage("move", data);
}

function heroMove(id, x, y) {
    heroArray.forEach(hero => {
        if (hero.id == id) {
            hero.x = x;
            hero.y = y;
        }
    });
}

function paintHero() {
    heroArray.forEach(hero => hero.draw());
}

function updateHero(now) {
    heroArray.forEach(hero => hero.update(now));
}