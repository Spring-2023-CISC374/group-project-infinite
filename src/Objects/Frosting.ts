export default class Frosting extends Phaser.GameObjects.Image {
    // const bluefrost = this.add.sprite(900, 320,'blue-frosting').setScale(.15).setInteractive();


    constructor(scene: Phaser.Scene, xVal: number, yVal: number, frostingKey: string) {
        super(scene, xVal, yVal, frostingKey);
        this.setScale(0.15);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.add.existing(this);
    }   

}