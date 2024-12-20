function ClientRoutes() {
    this.gameStart = function (data) {
        gameStart(data)
    }
    this.move = function (data) {
        addHeroMove(data.id, data.x, data.y, data.frameId);
    }
}

function initRoutes() {
    routes = new ClientRoutes();
    routerHandelMap = {};
    for (const key in routes) {
        if (typeof routes[key] === "function") {
            routerHandelMap[key] = routes[key];
        }
    }
}
