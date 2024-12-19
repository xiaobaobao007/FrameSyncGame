import {Player} from "../model/Player";
import {WebSocket} from "ws";
import {RoomManager} from "./RoomManager";

export class PlayerManager {
    private static uidMap = new Map<number, Player>();
    private static socketMap = new Map<WebSocket, Player>();

    public static join(socket: WebSocket) {
        let player = this.socketMap.get(socket);
        if (player) {
            return player;
        }

        let max = this.uidMap.size + 2;
        let id = 1;

        for (; id <= max; id++) {
            if (!this.uidMap.has(id)) {
                break;
            }
        }

        player = new Player(socket, id);

        this.uidMap.set(id, player);
        this.socketMap.set(socket, player);

        return player;
    }

    public static level(socket: WebSocket) {
        let player = this.socketMap.get(socket);
        if (!player) {
            return;
        }

        this.uidMap.delete(player.id);
        this.socketMap.delete(socket);
        RoomManager.level(player);
    }
}