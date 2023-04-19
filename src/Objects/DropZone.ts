import DraggableImage from "./DraggableImage";
import Liner from "./Liner";
import Frosting from "./Frosting";

export default class DropZone extends Phaser.GameObjects.Zone {

    zoneName: string;

    constructor(scene: Phaser.Scene, x: number, y: number, zoneName: string) {
        const width = 90;
        const height = 70;
        super(scene, x, y, width, height);
        this.zoneName = zoneName;
        
        this.setRectangleDropZone(width, height);

        scene.input.on('drop', (_pointer: Phaser.Input.Pointer, gameObject: any, dropZone: DropZone) => {
            if (gameObject instanceof Liner && dropZone.zoneName === "linerZone") {
                gameObject.setPosition(dropZone.x, dropZone.y);
            } 
            else if (gameObject instanceof Liner && dropZone.zoneName !== "linerZone") {
                gameObject.setPosition(gameObject.originalX, gameObject.originalY);
            }

            if (gameObject instanceof Frosting && dropZone.zoneName === "frostingZone") {
                gameObject.setPosition(dropZone.x, dropZone.y);
            } 
            else if (gameObject instanceof Frosting && dropZone.zoneName !== "frostingZone") {
                gameObject.setPosition(gameObject.originalX, gameObject.originalY);
            }
        })

        scene.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: DraggableImage, dropZone: Phaser.GameObjects.Zone) => {
            if (!dropZone) {
                gameObject.x = gameObject.originalX;
                gameObject.y = gameObject.originalY;
            }
        })

    }
}