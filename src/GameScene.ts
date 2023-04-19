import Phaser from 'phaser'
import Frosting from './Objects/Frosting'
import Liner from './Objects/Liner'
import DropZoneGraphic from './Objects/DropZoneGraphic'
import DropZone from './Objects/DropZone'


export default class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene")
	}
    preload() {
        this.load.image('bakery2','assets/bakery.png')
        this.load.image('blue-liner', 'assets/liner-blue.png')
		this.load.image('pink-liner', 'assets/liner-pink.png')
		this.load.image('pink-frosting', 'assets/pink-frosting.png')
		this.load.image('blue-frosting', 'assets/blue-frosting.png')
        this.load.image('yellow-frosting', 'assets/yellow-frosting.png')
        this.load.image('coin','assets/coin.png')
    }

    create() {
        this.add.image(545, 305,'bakery2'); 

        const blueFrosting = new Frosting(this, 900, 320, 'blue-frosting');
        const pinkFrosting = new Frosting(this, 820, 320, 'pink-frosting');
        const yellowFrosting = new Frosting(this, 740, 320, 'yellow-frosting');

        const pinkLiner = new Liner(this, 150, 570, 'pink-liner');
        const blueLiner = new Liner(this, 250, 570, 'blue-liner');

        let coins = 0;
        const coinImage = this.add.image(20, 20, 'coin').setScale(0.05);
        const coinCounterText = this.add.text(40, 10, `x ${coins}`, { fontSize: '24px', fill: '#000' });

        const zone1 = new DropZone(this, 400, 350);
        const graphic1 = new DropZoneGraphic(this, 400, 350);

        const zone2 = new DropZone(this, 400, 275);
        const graphic2 = new DropZoneGraphic(this, 400, 275);
        
        function updateCoinCounter() {
            coins++;
            coinCounterText.setText(`x ${coins}`);
        }
  
        // const storeButton = this.add.text(960, 20, 'Store').setFont("32px Arial").setColor("#ffffff").setInteractive();
        
        // storeButton.on('pointerdown', () => {
        //     this.scene.start('StoreScene');
        // }, this);

    }
}
