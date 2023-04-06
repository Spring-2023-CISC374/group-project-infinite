import Phaser from 'phaser';

export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super("InstructionsScene");
    }

    preload() {
        this.load.image("instructions", "assets/dessertbackground.png");
    }

    create() {
        this.add.image(545, 305, "instructions");

        const backButton = this.add.text(20, 20, "Back").setFont("23px Arial").setColor("#ffffff").setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start("bootGame");
        }, this);
    }
}
