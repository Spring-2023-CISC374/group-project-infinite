import Phaser from 'phaser';

export default class StoreScene extends Phaser.Scene {
    constructor() {
        super('StoreScene');
    }

    preload() {
        this.load.image('store', 'assets/dessertbackground.png'); 
    }
       
    create() {     
        const storeButton = this.add.text(320, 20, 'Store').setFont('25px Arial').setColor('#ffffff').setInteractive();

        this.add.image(545, 305, 'store');

        storeButton.on('pointerdown', () => {
            this.scene.start('StoreScene');
        }, this);
  
        const backButton = this.add.text(20, 20, 'Back').setFont('23px Arial').setColor('#ffffff').setInteractive();
  
        backButton.on('pointerdown', () => {
            this.scene.start('KitchenScene');
        }, this);

    }
}

