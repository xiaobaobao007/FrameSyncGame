function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    CANVAS_WIDTH = Math.floor(canvas.width);
    CANVAS_HEIGHT = Math.floor(canvas.height);

    HERO_HEIGHT = Math.floor(CANVAS_HEIGHT / 10);
    BALL_HEIGHT = CANVAS_HEIGHT - HERO_HEIGHT;
}

function start() {
    random.init(parseInt(document.getElementById("initRandomSeed").value));

    let time = document.getElementById("startTime").value;
    if (!time || time.length < 2) {
        serverStartTime = Date.now();
        serverStartTime = serverStartTime - serverStartTime % 1000;
        document.getElementById("startTime").value = getTimeStr(serverStartTime);
    } else {
        serverStartTime = Date.parse(time);
    }

    ballInit();
    heroInit();

    resetFps();

    PAUSE = false;
}

function pause() {
    PAUSE = true;
}

function continue_() {
    resetFps();
    PAUSE = false;
}

function resetFps() {
    paintFrameMs = 1000 / parseInt(document.getElementById("fps").value);
}

function getTimeStr(timestamp) {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

function timeThread() {
    if (PAUSE) {
        return;
    }

    let now = Date.now();

    //渲染层
    repaint(now);

    //逻辑层
    calculate(now);
}

function repaint(now) {
    if (now < lastPaintTime) {
        return;
    }

    lastPaintTime = now + paintFrameMs;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    paintBall();

    paintHero();
}

function calculate(now) {
    if (now < serverStartTime) {
        return;
    }

    let times = Math.floor((now - serverStartTime) / calculateFrameMs);

    if (times <= 0) {
        return;
    }

    if (times > 10) {
        times = Math.floor(times / 10);
    }

    for (let i = 0; i < times; i++) {
        serverStartTime += calculateFrameMs;
        updateBall();
    }

    updateHero(now);
}