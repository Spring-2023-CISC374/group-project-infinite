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

        const linerZone = new DropZone(this, 400, 350, 'linerZone');
        const linerZoneGraphic = new DropZoneGraphic(this, 400, 350);

        const frostingZone = new DropZone(this, 400, 275, 'frostingZone');
        const frostingZoneGraphic = new DropZoneGraphic(this, 400, 275);

        const blueFrosting = new Frosting(this, 900, 320, 'blue-frosting', frostingZone);
        const pinkFrosting = new Frosting(this, 820, 320, 'pink-frosting', frostingZone);
        const yellowFrosting = new Frosting(this, 740, 320, 'yellow-frosting', frostingZone);

        const pinkLiner = new Liner(this, 150, 570, 'pink-liner', linerZone);
        const blueLiner = new Liner(this, 250, 570, 'blue-liner', linerZone);

        let coins = 0;
        const coinImage = this.add.image(20, 20, 'coin').setScale(0.05);
        const coinCounterText = this.add.text(40, 10, `x ${coins}`, { fontSize: '24px', fill: '#000' });


        
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
