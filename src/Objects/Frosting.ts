import DraggableImage from "./DraggableImage";

export default class Frosting extends DraggableImage {

    constructor(scene: Phaser.Scene, x: number, y: number, frostingKey: string) {
        super(scene, x, y, frostingKey);
        this.setScale(0.15);
        scene.add.existing(this);
    }   

}