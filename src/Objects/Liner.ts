import DraggableImage from "./DraggableImage";

export default class Liner extends DraggableImage {
    
    constructor(scene: Phaser.Scene, x: number, y: number, linerKey: string) {
        super(scene, x, y, linerKey);
        this.setScale(0.5);
        scene.add.existing(this);
    }
}