export class FrameOperation {
    public unionId: number;
    public frameId: number;
    public playerId: number;
    public x: number;
    public y: number;

    constructor(unionId: number, frameId: number, playerId: number, x: number, y: number) {
        this.unionId = unionId;
        this.frameId = frameId;
        this.playerId = playerId;
        this.x = x;
        this.y = y;
    }
}