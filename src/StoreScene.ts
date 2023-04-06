import Phaser from 'phaser';

export default class StoreScene extends Phaser.Scene {
    constructor() {
        super('StoreScene');
    }

    preload() {
        this.load.image('store', 'assets/dessertbackground.png');
    }
       
    create() {
        this.add.image(545, 305, 'store');
        
        const backButton = this.add.text(20, 20, 'Back').setFont('23px Arial').setColor('#ffffff').setInteractive();
  
        backButton.on('pointerdown', () => {
            this.scene.start('KitchenScene');
        }, this);

    }
}

