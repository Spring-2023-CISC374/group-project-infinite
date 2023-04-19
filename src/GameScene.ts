import Phaser from 'phaser'
import Frosting from './Objects/Frosting'
import Liner from './Objects/Liner'
import Zone from './Objects/Zone'
import DropZoneGraphic from './Objects/DropZoneGraphic'


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

        // pinkfrost.depth = 100
        // bluefrost.depth = 100  
        // yellowfrost.depth = 100
        

        // this.input.on('drag', function (pointer: any, gameObject: { x: any; y: any },dragX: any, dragY: any){
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        // })
        // this.input.on('dragenter', function (pointer: any, gameObject: any, dropZone: any) {

        //     graphics.clear();
        //     graphics.lineStyle(2, 0x00ffff);
        //     graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        // });
        // this.input.on('dragleave', function (pointer: any, gameObject: any, dropZone: any) {

        //     graphics.clear();
        //     graphics.lineStyle(2, 0xffff00);
        //     graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        // });
        // this.input.on('drop', function (pointer: any, gameObject: { x: any; y: any; input: { enabled: boolean } }, dropZone: { x: any; y: any }) {

        //     gameObject.x = dropZone.x;
        //     gameObject.y = dropZone.y;
    
        //     gameObject.input.enabled = true;
    
        // });

        // this.input.on('dragend', function (pointer: any, gameObject: { x: any; input: { dragStartX: any; dragStartY: any }; y: any }, dropped: any) {

        //     if (!dropped)
        //     {
        //         gameObject.x = gameObject.input.dragStartX;
        //         gameObject.y = gameObject.input.dragStartY;
        //     }
    
        //     graphics.clear();
        //     graphics.lineStyle(2, 0xffff00);
        //     graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        // });

        const zone1 = new Zone(this, 400, 350);
        const graphic1 = new DropZoneGraphic(this, 400, 350);

        const zone2 = new Zone(this, 400, 275);
        const graphic2 = new DropZoneGraphic(this, 400, 275);
        
        function updateCoinCounter() {
            coins++;
            coinCounterText.setText(`x ${coins}`);
        }
  
        // this.input.on('drop', (pointer, gameObject, dropZone) => {
        //     gameObject.x = dropZone.x;
        //     gameObject.y = dropZone.y;
        //     gameObject.input.enabled = true;
            
        //     if ((gameObject === pinkfrost || gameObject === bluefrost || gameObject === yellowfrost) && (dropZone === zone || dropZone === zone2)) {
        //         updateCoinCounter();
        //     }


        // const storeButton = this.add.text(960, 20, 'Store').setFont("32px Arial").setColor("#ffffff").setInteractive();
        
        // storeButton.on('pointerdown', () => {
        //     this.scene.start('StoreScene');
        // }, this);

        // });
    }
}
