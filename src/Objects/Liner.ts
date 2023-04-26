import DraggableImage from "./DraggableImage";
import DropZone from "./DropZone";

export default class Liner extends DraggableImage {
    
    constructor(scene: Phaser.Scene, x: number, y: number, linerKey: string, zone: DropZone) {
        super(scene, x, y, linerKey, zone);
        this.setScale(0.5);

        this.on('drop', (_pointer: Phaser.Input.Pointer, dropZone: DropZone) => {
            if ((dropZone.zoneName === "linerZone" && !dropZone.hasItem()) || dropZone.currItem === this) {
                this.setPosition(dropZone.x, dropZone.y);
                dropZone.setItem(this);
                zone.setItem(this);
            } 
            else {
                this.setPosition(this.originalX, this.originalY);
            }
        })
        
        scene.add.existing(this);
    }
}