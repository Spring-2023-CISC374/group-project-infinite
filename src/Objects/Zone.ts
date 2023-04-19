export default class Zone extends Phaser.GameObjects.Zone {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        const width = 90;
        const height = 70;
        super(scene, x, y, width, height);
        this.setRectangleDropZone(width, height);

        scene.input.on('drop', (_pointer: Phaser.Input.Pointer, gameObject: any, dropZone: Phaser.GameObjects.Zone) => {
            gameObject.setPosition(dropZone.x, dropZone.y);
        })
    }
}