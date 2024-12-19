import {RoomManager} from "./manager/RoomManager";
import {Player} from "./model/Player";

export function WebSocketRoute(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('wsRoute', path, target, propertyKey);
    };
}

export class ServerRoutes {
    @WebSocketRoute('join')
    async join(player: Player, data: any) {
        RoomManager.join(player, data.roomId);
    }

    @WebSocketRoute('move')
    async move(player: Player, data: any) {
        RoomManager.move(player, data);
    }
}

const webSocketRoutes = new ServerRoutes();
const routeHandlers = Object.getOwnPropertyNames(ServerRoutes.prototype)
    .filter((key) => Reflect.hasMetadata('wsRoute', webSocketRoutes, key));

export const routerHandelMap = new Map<string, any>

for (const handlerName of routeHandlers) {
    const route = Reflect.getMetadata('wsRoute', webSocketRoutes, handlerName);
    console.info("addRoute：", route);
    const handler = (webSocketRoutes as any)[handlerName].bind(webSocketRoutes);
    routerHandelMap.set(route, handler);
}