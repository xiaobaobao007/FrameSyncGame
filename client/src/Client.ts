// // 创建WebSocket客户端连接到服务器
// const ws = new WebSocket('ws://localhost:8080');
//
// ws.on('open', () => {
//     console.log('已连接到WebSocket服务器');
//     // 构造要发送的JSON格式数据示例
//     const dataToSend = {
//         type: 'request',
//         message: '这是一条测试消息',
//         otherInfo: {
//             key: 'value'
//         }
//     };
//     ws.send(JSON.stringify(dataToSend));
// });
//
// ws.on('message', (message: string) => {
//     try {
//         const response = JSON.parse(message);
//         console.log('收到服务器响应的JSON数据:', response);
//     } catch (err) {
//         console.error('解析服务器响应的JSON数据出错:', err);
//     }
// });
//
// ws.on('close', () => {
//     console.log('与WebSocket服务器的连接已关闭');
// });
//
// ws.on('error', (err) => {
//     console.error('WebSocket连接出错:', err);
// });