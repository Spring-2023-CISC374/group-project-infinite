import DraggableImage from "./DraggableImage";

export default class Liner extends DraggableImage {
    
    constructor(scene: Phaser.Scene, xVal: number, yVal: number, linerKey: string) {
        super(scene, xVal, yVal, linerKey);
        this.setScale(0.5);
        scene.add.existing(this);
    }
}