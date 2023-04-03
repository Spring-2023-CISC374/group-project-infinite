import Phaser from 'phaser'

export default class KitchenScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    
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
        
    }

    update() {
        if (!this.cursors) return;

		if (this.cursors.left.isDown) {
			this.player?.setVelocityX(-300);
		}
		else if (this.cursors.right.isDown) {
			this.player?.setVelocityX(300);
		}

		else {
			this.player?.setVelocityX(0);
		}

		if (this.cursors.up.isDown && this.player?.body.touching.down) {
			this.player.setVelocityY(-330);
		}
    }
}
