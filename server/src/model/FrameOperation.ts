export class FrameOperation {
    private frameId: number;
    private playerId: number;
    private x: number;
    private y: number;

    constructor(frameId: number, playerId: number, x: number, y: number) {
        this.frameId = frameId;
        this.playerId = playerId;
        this.x = x;
        this.y = y;
    }
}