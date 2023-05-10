import DropZone from "./DropZone";

export default class DraggableImage extends Phaser.GameObjects.Image {
    originalX: number;
    originalY: number;
    key: string;

    constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string, zone: DropZone) {
        super(scene, x, y, imageKey);
        this.originalX = x;
        this.originalY = y;
        this.key = imageKey;
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
                 dropZone.clearItem();
                 zone.clearItem();
            }
        })
    }

    resetImage(){
        this.x = this.originalX;
        this.y = this.originalY;
    }
}