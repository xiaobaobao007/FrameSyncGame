function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    CANVAS_WIDTH = Math.floor(canvas.width);
    CANVAS_HEIGHT = Math.floor(canvas.height);

    HERO_HEIGHT = Math.floor(CANVAS_HEIGHT / 15);
    BALL_HEIGHT = CANVAS_HEIGHT - HERO_HEIGHT;

    addListener();

    initRoutes();
}

function clickStartOutline() {
    let uid = document.getElementById("uid").value;
    let initRandomSeed = document.getElementById("initRandomSeed").value;
    let startTime = document.getElementById("startTime").value;
    if (!uid || uid.length === 0) {
        uid = 1;
    } else {
        uid = parseInt(uid);
    }
    if (!initRandomSeed || initRandomSeed.length === 0) {
        initRandomSeed = 1000;
    } else {
        initRandomSeed = parseInt(initRandomSeed);
    }

    if (!startTime || startTime.length === 0) {
        startTime = Date.now();
    } else {
        startTime = Date.parse(startTime);
    }

    let data = {
        myId: uid,
        seed: initRandomSeed,
        startTime: startTime,
        allId: [
            {id: uid, x: 50, y: 90},
        ]
    };

    gameStart(data);

    ws = undefined;
}

function clickStartOnline() {
    initWs();
}

function gameStart(data) {
    document.getElementById("uid").value = data.myId;
    document.getElementById("initRandomSeed").value = data.seed;
    document.getElementById("startTime").value = getTimeStr(data.startTime);

    random.init(data.seed);
    clientStartTime = clientRunTime = data.startTime;

    heroArray = [];

    data.allId.forEach((player) => {
        const id = player.id;
        const isMe = (id == data.myId);

        const newHero = new Hero();
        newHero.initHero(id, isMe, player.x, player.y);
        newHero.setGun(new Gun());

        if (isMe) {
            hero = newHero;
        }

        heroArray.push(newHero);
    });

    initBullet();
    ballInit();

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