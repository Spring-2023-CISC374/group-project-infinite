export default class DropZoneGraphic extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, {x: x, y: y});

        const width = 90;
        const height = 70;
        const left = -width / 2;
        const top = -height / 2;
        
        this.lineStyle(2, 0xffff00);
        this.strokeRect(left, top, width, height);

        scene.add.existing(this);
    }
}