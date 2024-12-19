function ClientRoutes() {
    this.gameStart = function (data) {
        gameStart(data)
    }
    this.move = function (data) {
        heroMove(data.id, data.x, data.y);
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
