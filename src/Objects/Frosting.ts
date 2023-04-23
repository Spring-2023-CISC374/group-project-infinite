import DraggableImage from "./DraggableImage";
import DropZone from "./DropZone";

export default class Frosting extends DraggableImage {

    constructor(scene: Phaser.Scene, x: number, y: number, frostingKey: string, zone: DropZone) {
        super(scene, x, y, frostingKey);
        this.setScale(0.15);

        this.on('drop', (_pointer: Phaser.Input.Pointer, dropZone: DropZone) => {
            if ((dropZone.zoneName === "frostingZone" && !dropZone.hasItem()) || dropZone.currItem === this) {
                this.setPosition(dropZone.x, dropZone.y);
                dropZone.setItem(this);
            } 
            else {
                this.setPosition(this.originalX, this.originalY);
            }
        })

        this.on('dragend', () => {            
            if (!zone.getBounds().contains(this.x, this.y)) {
                this.setPosition(this.originalX, this.originalY);
            }
        })

        this.on('dragleave', (_pointer: Phaser.Input.Pointer, dropZone: DropZone) => {
            if (dropZone.currItem === this) {
                 dropZone.setItem(null);
            }
        })

        scene.add.existing(this);
    }   

}