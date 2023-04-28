

export default class AddTxtButton extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, y: number, text: string, callback: () => void) {
        super(scene, scene.scale.width / 2, y, text, {});
        console.log("in text button - " + text)

       
        this.setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerdown', () => this.enterButtonActiveState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                callback();
            });           
    }

    enterButtonHoverState() {
        this.setStyle({ fill: '#ff0' });
    }

    enterButtonRestState() {
        this.setStyle({ fill: '#0f0' });
    }

    enterButtonActiveState() {
        this.setStyle({ fill: '#0ff' });
    }
}