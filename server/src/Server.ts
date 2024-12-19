import express from 'express';
import {createServer} from 'http';
import expressWs from 'express-ws';
import 'reflect-metadata';
import {routerHandelMap} from "./ServerRoutes";
import {PlayerManager} from "./manager/PlayerManager";

const app = express();
const server = createServer(app);
const {app: wsApp, getWss} = expressWs(app, server);


wsApp.ws('*', (socket, req) => {
    socket.on('close', async (message: string) => {
        PlayerManager.level(socket);
    });

    socket.on('message', async (message: string) => {
        const player = PlayerManager.join(socket);

        const data = JSON.parse(message);
        console.log("receive", data);
        routerHandelMap.get(data.route)(player, data.data, getWss());
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});