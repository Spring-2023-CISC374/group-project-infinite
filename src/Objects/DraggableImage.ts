export default class DraggableImage extends Phaser.GameObjects.Image {
    originalX: number;
    originalY: number;

    constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string) {
        super(scene, x, y, imageKey);
        this.originalX = x;
        this.originalY = y;
        this.setInteractive();
        scene.input.setDraggable(this);

        this.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY);
        })

    }
}