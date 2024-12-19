import {Player} from "./Player";
import {FrameOperation} from "./FrameOperation";

export class Room {
    private seed: number = 0;
    private startTime: number = 0;

    private playerArray: Player[] = [];
    private operationArray: FrameOperation[] = [];

    start = false;

    public addPlayer(player: Player) {
        if (this.start) {
            return;
        }

        if (this.playerArray.indexOf(player) >= 0) {
            return;
        }

        this.playerArray.push(player);

        setTimeout(this.gameStart.bind(this), 2000);
    }

    private gameStart() {
        if (this.start) {
            return;
        }

        this.start = true;

        let data: any = {
            allId: []
        };

        data.myId = 0;
        data.seed = Math.floor(Math.random() * 10000 + 10000);
        data.startTime = Date.now();

        for (const player of this.playerArray) {
            data.allId.push({
                id: player.id,
                x: Math.floor(Math.random() * 80) + 10,
                y: Math.floor(Math.random() * 80) + 10,
            })
        }

        for (const player of this.playerArray) {
            data.myId = player.id;
            player.send("gameStart", data);
        }
    }

    public removePlayer(player: Player) {
        this.playerArray.splice(this.playerArray.indexOf(player), 1);

        return this.playerArray.length == 0;
    }

    public broadcast(route: string, data: any) {
        for (let i = 0; i < this.playerArray.length; i++) {
            this.playerArray[i].send(route, data);
        }
    }

}