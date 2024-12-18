import WebSocket from 'ws';

// 创建WebSocket服务器，监听在8080端口
const wss = new WebSocket.Server({port: 8080});

wss.on('connection', (ws) => {
    console.log('有客户端连接上来了');

    // 当收到客户端发送的消息时
    ws.on('message', (message: string) => {
        try {
            const data = JSON.parse(message);
            console.log('收到客户端发来的JSON数据:', data);

            // 这里可以进行相应处理，比如对收到的数据做一些逻辑操作
            // 然后再发送响应给客户端，这里简单回传一个包含"response"字段的JSON数据示例
            const responseData = {
                type: 'response',
                message: '已收到你的消息，这是响应内容',
                data: data
            };
            ws.send(JSON.stringify(responseData));
        } catch (err) {
            console.error('解析JSON数据出错:', err);
            // 可以给客户端发送错误提示消息（可选）
            const errorData = {
                type: 'error',
                message: '发送的数据格式不符合JSON规范'
            };
            ws.send(JSON.stringify(errorData));
        }
    });

    // 当客户端关闭连接时触发
    ws.on('close', () => {
        console.log('客户端断开连接');
    });
});

console.log('WebSocket服务器已启动，正在监听8080端口');