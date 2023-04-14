import Phaser from 'phaser'
export default class GameScene extends Phaser.Scene {
        constructor() {
            super("GameScene")
        }
        preload() {
            this.load.image('bakery2', 'assets/bakery.png')
            this.load.image('blue-liner', 'assets/liner-blue.png')
            this.load.image('pink-liner', 'assets/liner-pink.png')
            this.load.image('pink-frosting', 'assets/pink-frosting.png')
            this.load.image('blue-frosting', 'assets/blue-frosting.png')
            this.load.image('yellow-frosting', 'assets/yellow-frosting.png')
            this.load.image('purple-frosting', 'assets/purple-frosting.png');
            this.load.image('coin', 'assets/coin.png')
        }
        create() {
                this.add.image(545, 305, 'bakery2');
                const bluefrost = this.add.sprite(900, 320, 'blue-frosting').setScale(.15).setInteractive();
                const pinkfrost = this.add.sprite(820, 320, 'pink-frosting').setScale(.15).setInteractive();
                const yellowfrost = this.add.sprite(740, 320, 'yellow-frosting').setScale(.15).setInteractive();
                const purplefrost = this.add.sprite(660, 320, 'purple-frosting').setScale(.15).setInteractive();
                const pinkliner = this.add.sprite(150, 570, 'pink-liner').setScale(.5).setInteractive();
                const blueliner = this.add.sprite(250, 570, 'blue-liner').setScale(.5).setInteractive();
                let coins = 0;
                const coinImage = this.add.image(490, 30, 'coin').setScale(0.05);
                const coinCounterText = this.add.text(520, 20, `x ${coins}`, {
                    fontSize: '24px',
                    fill: '#000'
                });
                this.input.setDraggable(pinkfrost);
                this.input.setDraggable(bluefrost);
                this.input.setDraggable(yellowfrost);
                this.input.setDraggable(purplefrost);
                this.input.setDraggable(pinkliner);
                this.input.setDraggable(blueliner);
                pinkfrost.depth = 100
                bluefrost.depth = 100
                yellowfrost.depth = 100
                purplefrost.depth = 100
                this.input.on('drag', function(pointer: any, gameObject: {
                    x: any;y: any
                }, dragX: any, dragY: any) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                })
                this.input.on('drop', function(pointer: any, gameObject: {
                    x: any;y: any;input: {
                        enabled: boolean
                    }
                }, dropZone: {
                    x: any;y: any
                }) {
                    gameObject.x = dropZone.x;
                    gameObject.y = dropZone.y;
                    gameObject.input.enabled = true;
                });
                this.input.on('dragend', function(pointer: any, gameObject: {
                    x: any;input: {
                        dragStartX: any;dragStartY: any
                    };y: any
                }, dropped: any) {
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

                function updateCoinCounter() {
                    coins++;
                    coinCounterText.setText(`x ${coins}`);
                }
                this.input.on('drop', (pointer, gameObject, dropZone) => {
                    gameObject.x = dropZone.x;
                    gameObject.y = dropZone.y;
                    gameObject.input.enabled = true;
                    if ((gameObject === pinkfrost || gameObject === bluefrost || gameObject === yellowfrost || gameObject === purplefrost) && (dropZone === zone || dropZone === zone2)) {
                        updateCoinCounter();
                    }
                    const graphics1 = this.add.graphics();
                    graphics1.fillStyle(0xfdadac, 1);
                    graphics1.fillRoundedRect(5, 5, 150, 60, 30);
                    graphics1.setInteractive();
                    const startGame = this.add.text(35, 20, "Restart").setFont("20px Arial").setColor("#ffffff").setInteractive();
                    const renderStart = this.add.renderTexture(10, 5, 110, 40).setInteractive();
                    renderStart.draw(graphics1);
                    renderStart.draw(startGame);
                    renderStart.setInteractive();
                    renderStart.on('pointerdown', () => {
                        blueliner.setPosition(250, 570)
                        pinkliner.setPosition(150, 570)
                        pinkfrost.setPosition(820, 320)
                        purplefrost.setPosition(660, 320)
                        yellowfrost.setPosition(740, 320)
                        bluefrost.setPosition(900, 320)
                    }, this);
                    startGame.destroy();
                    const storeButton = this.add.text(960, 20, 'Store').setFont("32px Arial").setColor("#ffffff").setInteractive();
                    storeButton.on('pointerdown', () => {
                        this.scene.start('StoreScene');
                    }, this);
                });
            }
        }
        
}
