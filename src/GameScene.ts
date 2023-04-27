import Phaser from 'phaser'
import Frosting from './Objects/Frosting'
import Liner from './Objects/Liner'
import DropZoneGraphic from './Objects/DropZoneGraphic'
import DropZone from './Objects/DropZone'
import Cupcake from './Objects/Cupcake'


export default class GameScene extends Phaser.Scene {

    linerZone?: DropZone;
    linerZoneGraphic?: DropZoneGraphic;

    frostingZone?: DropZone;
    frostingZoneGraphic?: DropZoneGraphic;

    blueFrosting?: Frosting;
    pinkFrosting?: Frosting;
    yellowFrosting?: Frosting;

    blueLiner?: Liner;
    pinkLiner?: Liner;

    userCupcake: Cupcake | null = null;

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

        this.linerZone = new DropZone(this, 400, 350, 'linerZone');
        this.linerZoneGraphic = new DropZoneGraphic(this, 400, 350);

        this.frostingZone = new DropZone(this, 400, 275, 'frostingZone');
        this.frostingZoneGraphic = new DropZoneGraphic(this, 400, 275);

        this.blueFrosting = new Frosting(this, 900, 320, 'blue-frosting', this.frostingZone);
        this.pinkFrosting = new Frosting(this, 820, 320, 'pink-frosting', this.frostingZone);
        this.yellowFrosting = new Frosting(this, 740, 320, 'yellow-frosting', this.frostingZone);

        this.pinkLiner = new Liner(this, 150, 570, 'pink-liner', this.linerZone);
        this.blueLiner = new Liner(this, 250, 570, 'blue-liner', this.linerZone);

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
        
        const finishCupcake = this.add.text(460, 350, "Bake Cupcake").setFontSize(20);
        finishCupcake.setInteractive();
        finishCupcake.on('pointerdown', () => this.startBakeScene());

        
    }

    startBakeScene(): void {
            if (this.userCupcake != null){
                this.userCupcake.printCupcake();
                this.scene.start("BakeScene", this.getCupcake());
            }
    }

    updateCupcake(): void {
        if (!this.frostingZone || !this.linerZone) return;

        if (!this.frostingZone.hasItem() || !this.linerZone.hasItem()) {
            this.userCupcake = null;
            return;
        }
        
        if (this.userCupcake) return;

        if (this.frostingZone.currItem && this.linerZone.currItem) {
            this.userCupcake = new Cupcake(this.frostingZone.currItem, this.linerZone.currItem);
            this.userCupcake.printCupcake();
            return;
        }
    }
    getCupcake(){
            return {liner: this.userCupcake?.liner, frosting: this.userCupcake?.frosting};
    }

    update() {
        this.updateCupcake();
    }

}
