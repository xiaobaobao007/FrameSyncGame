import {WebSocket} from "ws";

export class Player {
    private socket: WebSocket;
    private _id: number;
    private _roomId: string = "";

    constructor(socket: WebSocket, id: number) {
        this.socket = socket;
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    public send(route: string, data: any) {
        let send = {
            route: route,
            data: data
        }
        this.socket.send(JSON.stringify(send));
    }

    get roomId(): string {
        return this._roomId;
    }

    set roomId(value: string) {
        this._roomId = value;
    }
}