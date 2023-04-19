export default class DraggableImage extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, xVal: number, yVal: number, imageKey: string) {
        super(scene, xVal, yVal, imageKey);
        this.setInteractive();
        scene.input.setDraggable(this);

        this.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY);
        })

    }
}