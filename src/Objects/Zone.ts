export default class Zone extends Phaser.GameObjects.Zone {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        const width = 90;
        const height = 70;
        super(scene, x, y, width, height);
        this.setRectangleDropZone(width, height);
    }
}