import Phaser from 'phaser';

export default class StoreScene extends Phaser.Scene {
    constructor() {
        super('StoreScene');
    }

    preload() {
        this.load.image('store', 'assets/dessertbackground.png'); 
        this.load.image('purple-frosting', 'assets/purple-frosting.png');
    }
       
    create() {  
        this.add.image(545, 305, 'store');
   
        const purpleFrosting = this.add.image(300, 250, 'purple-frosting');
        purpleFrosting.setScale(0.3); 
        purpleFrosting.setDepth(1); 
        purpleFrosting.setInteractive();

        purpleFrosting.on('pointerdown', () => {
            this.scene.get('GameScene').data.set('purpleFrosting', true);
            this.scene.get('GameScene').data.set('coins', this.scene.get('GameScene').data.get('coins') - 1);
            this.scene.start('GameScene');
        });
        
        const backButton = this.add.text(20, 20, 'Back').setFont('23px Arial').setColor('#ffffff').setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.switch('GameScene');
        }, this);
        
    }
}
