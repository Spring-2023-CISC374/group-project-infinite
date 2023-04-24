import DraggableImage from "./DraggableImage";

export default class DropZone extends Phaser.GameObjects.Zone {

    zoneName: string;
    currItem: DraggableImage | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, zoneName: string) {
        const width = 90;
        const height = 70;
        super(scene, x, y, width, height);
        this.zoneName = zoneName;
        this.setRectangleDropZone(width, height);
    }

    hasItem(): boolean {
        if (this.currItem === null) return false;
        return true;
    }

    setItem(gameObject: DraggableImage | null) {
        this.currItem = gameObject;
    }
}