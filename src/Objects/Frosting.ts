export default class Frosting extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, xVal: number, yVal: number, frostingKey: string) {
        super(scene, xVal, yVal, frostingKey);
        this.setScale(0.15);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.add.existing(this);
    }   

}