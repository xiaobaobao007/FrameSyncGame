function initWs() {
    ws = new WebSocket('ws://localhost:8080/');

    // 连接建立时触发
    ws.onopen = function () {
        console.log('WebSocket连接已建立');

        sendWsMessage("join", {roomId: document.getElementById("roomId").value});
    };

    // 接收服务器消息时触发
    ws.onmessage = function (event) {
        console.info("收到", event.data);
        let data = JSON.parse(event.data);
        routerHandelMap[data.route](data.data);
    };

    // 连接出错时触发
    ws.onerror = function (error) {
        console.log('WebSocket连接出错:', error);
        const errorDiv = document.createElement('div');
        errorDiv.textContent = `连接出错: ${error}`;
        document.getElementById('messageBox').appendChild(errorDiv);
    };

    // 连接关闭时触发
    ws.onclose = function () {
        console.log('WebSocket连接已关闭');
        const closeDiv = document.createElement('div');
        closeDiv.textContent = '连接已关闭';
        document.getElementById('messageBox').appendChild(closeDiv);
    };
}

function sendWsMessage(route, message) {
    if (ws.readyState !== WebSocket.OPEN) {
        initWs();
    }

    let data = {
        route: route,
        data: message
    };
    ws.send(JSON.stringify(data));
}