export default class Liner extends Phaser.GameObjects.Image {
    
    constructor(scene: Phaser.Scene, xVal: number, yVal: number, linerKey: string) {
        super(scene, xVal, yVal, linerKey);
        this.setScale(0.5);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.add.existing(this);
    }
}