import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene")
	}
    preload() {
        this.load.image('bakery2','assets/newbakery_drawing.png')
        this.load.image('blue-liner', 'assets/liner-blue.png')
		this.load.image('pink-liner', 'assets/liner-pink.png')
		this.load.image('pink-frosting', 'assets/pink-frosting.png')
		this.load.image('blue-frosting', 'assets/blue-frosting.png')
        this.load.image('yellow-frosting', 'assets/yellow-frosting.png')
        this.load.image('coin','assets/coin.png')
    }

    create() {
        this.add.image(550, 305, 'bakery2').setScale(0.665);

        this.add.graphics({ fillStyle: { color: 0xfdadac } }).fillEllipse(70, 30, 120, 50);
        const startGame = this.add.text(35,20,"Restart").setFont("20px Arial").setColor("#ffffff").setInteractive();

        const bluefrost = this.add.sprite(900, 320,'blue-frosting').setScale(.15).setInteractive();
        const pinkfrost = this.add.sprite(820, 320,'pink-frosting').setScale(.15).setInteractive();
        const yellowfrost = this.add.sprite(740, 320,'yellow-frosting').setScale(.15).setInteractive();
        const pinkliner = this.add.sprite(150, 570,'pink-liner').setScale(.5).setInteractive();
        const blueliner = this.add.sprite(250, 570,'blue-liner').setScale(.5).setInteractive();
        let coins = 0;
        const coinImage = this.add.image(520, 20, 'coin').setScale(0.05);
        const coinCounterText = this.add.text(550, 10, `x ${coins}`, { fontSize: '24px', fill: '#000' });

        const orderText1 = this.add.text(109, 170, 'Order:', { fontSize: '14px', color: '#000' });
        const orderText2 = this.add.text(77, 195, `Liner: \nFrosting: `, { fontSize: '12.5px', color: '#000' });

        const updateOrder = () => {
            const liners = ['blue', 'pink'];
            const frostings = ['yellow', 'blue', 'pink'];

            const randomLiner = liners[Math.floor(Math.random() * liners.length)];
            const randomFrosting = frostings[Math.floor(Math.random() * frostings.length)];

            orderText2.setText(`Liner: ${randomLiner}\nFrosting: ${randomFrosting}`);
        };

        updateOrder();

        this.input.setDraggable(pinkfrost);
        this.input.setDraggable(bluefrost);
        this.input.setDraggable(yellowfrost);
        this.input.setDraggable(pinkliner);
        this.input.setDraggable(blueliner);

        pinkfrost.depth = 100
        bluefrost.depth = 100  
        yellowfrost.depth = 100

        this.input.on('drag', function (pointer: any, gameObject: { x: any; y: any }, dragX: any, dragY: any) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = true;

            if ((gameObject === pinkfrost || gameObject === bluefrost || gameObject === yellowfrost) && (dropZone === zone || dropZone === zone2)) {
                updateCoinCounter();
            }
        });

        this.input.on('dragend', function (pointer: any, gameObject: { x: any; input: { dragStartX: any; dragStartY: any }; y: any }, dropped: any) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        const zone = this.add.zone(400, 350, 90, 70).setRectangleDropZone(90, 70);
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        const zone2 = this.add.zone(400, 275, 90, 70).setRectangleDropZone(90, 70);
        const graphics2 = this.add.graphics();
        graphics2.lineStyle(1, 0xffffff);
        graphics2.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);

        startGame.on('pointerdown', () => {
            updateOrder();
        });

        const storeButton = this.add.text(960, 20, 'Store').setFont("32px Arial").setColor("#ffffff").setInteractive();

        storeButton.on('pointerdown', () => {
            this.scene.start('StoreScene');
        }, this);
    }
}
