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
        this.load.image("player", "assets/player.png");
    }

    create() {
        this.add.image(545, 305, "kitchen");
		this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(100, 100, "player");
        this.player.setCollideWorldBounds(true);
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.zone = this.add.zone(525, 250, 250, 150);
        this.physics.add.existing(this.zone, true);

        // create the prompt text
        this.promptText = this.add.text(300, 150, 'Press E to bake!', {
        fontFamily: 'Arial',
        fontSize: '40px',
        color: '#000'
        });
        this.promptText.setVisible(false);

        this.physics.add.overlap(this.player, this.zone, () => {
            this.promptText?.setVisible(true);
            this.input.keyboard.once('keydown', (event: KeyboardEvent) => {
                if (event.key === 'e') {
                    this.scene.start('GameScene');
                }
            });
        });    
    }

    update() {
        if (!this.cursors) return;
        if (!this.player) return;
        if (!this.physics.overlap(this.player, this.zone)) {
            this.promptText?.setVisible(false);
        }

		if (this.cursors.left.isDown) {
			this.player?.setVelocityX(-160);
		}
		else if (this.cursors.right.isDown) {
			this.player?.setVelocityX(160);
		}

		else {
			this.player?.setVelocityX(0);
		}

		if (this.cursors.up.isDown && this.player?.body.touching.down) {
			this.player.setVelocityY(-330);
		}
    }
}
