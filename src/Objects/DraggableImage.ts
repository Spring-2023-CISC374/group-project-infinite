import DropZone from "./DropZone";

export default class DraggableImage extends Phaser.GameObjects.Image {
    originalX: number;
    originalY: number;

    constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string, zone: DropZone) {
        super(scene, x, y, imageKey);
        this.originalX = x;
        this.originalY = y;
        this.setInteractive();
        scene.input.setDraggable(this);

        this.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY);
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

    }
}