import Phaser from 'phaser'

export default class KitchenScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private interactKey?: Phaser.Input.Keyboard.Key;
    private zone?: Phaser.GameObjects.Zone;
    private promptText?: Phaser.GameObjects.Text;
    
    constructor() {
        super("KitchenScene")  
    }

    preload() {
        this.load.image("kitchen", "assets/kitchen.jpeg");
        this.load.image("instructions", "assets/instructions.png");
        this.load.image("player", "assets/baker.png");
    }   

    create() {
        this.add.image(545, 305, "kitchen");
		this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(100, 100, "player");
        this.player.setCollideWorldBounds(true);
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.zone = this.add.zone(250, 250, 50, 100);
        this.physics.add.existing(this.zone, true);

        this.promptText = this.add.text(400, 510, 'Press E to bake!', {
        fontFamily: 'Arial',
        fontSize: '40px',  
        color: '#000'
        });
        this.promptText.setVisible(false);

        let startScene = false;
        this.physics.add.overlap(this.player, this.zone, () => {
            this.promptText?.setVisible(true);
            this.input.keyboard.once('keydown', (event: KeyboardEvent) => {
                if (event.key === 'e' && !startScene) {
                    startGameScene();
                }
            });
        }, undefined, this);
        const backButton = this.add.text(16, 20, "Back").setFont("23px Arial").setColor("#000").setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start("bootGame");
        }, this);

        const startGameScene = () =>{
            this.scene.start("GameScene", {setflag: false} );
            startScene = true;
        }
        
    }  

    update() {
        if (!this.cursors) return;
  
		if (this.cursors.left.isDown) {
			this.player?.setVelocityX(-320);
		}
		else if (this.cursors.right.isDown) {
			this.player?.setVelocityX(320);
		}

		else {
			this.player?.setVelocityX(0);
		}

		if (this.cursors.up.isDown && this.player?.body.touching.down) {
			this.player.setVelocityY(-330);
		}
    }
}

