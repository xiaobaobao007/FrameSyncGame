// 获取canvas元素和绘图上下文

// 小球对象构造函数
function Ball() {
    this.radius = 11; // 小球半径
    this.x = 0;
    this.y = -this.radius;
    this.color = ``;
    this.speed = 0;

    this.init = function () {
        this.x = this.radius + random.random(CANVAS_WIDTH - this.radius * 2)
        this.y = -this.radius * 2;
        this.color = `rgb(${random.random(256)},${random.random(256)},${random.random(256)})`;
        this.speed = random.random(10) + 1; // 随机下落速度
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.update = function () {
        this.y += this.speed;
    };
}