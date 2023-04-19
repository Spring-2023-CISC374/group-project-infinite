import DraggableImage from "./DraggableImage";

export default class Frosting extends DraggableImage {

    constructor(scene: Phaser.Scene, xVal: number, yVal: number, frostingKey: string) {
        super(scene, xVal, yVal, frostingKey);
        this.setScale(0.15);
        scene.add.existing(this);
    }   

}