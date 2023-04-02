import Phaser from 'phaser'


export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super("bootGame")
	}

	preload() {
		this.load.image('bakery','assets/bakery.png')

	}

	create() {
		this.add.image(545, 305,'bakery');

		this.add.text(385, 100, "Infinite").setFont("100px Arial").setColor("#ffffff");

		const graphics = this.add.graphics();
		graphics.fillStyle(0xfdadac,1);
		graphics.fillRoundedRect(300, 300, 200, 90, 20);
		graphics.setInteractive();
	

		
		const startGame = this.add.text(52, 35, "Start Game").setFont("20px Arial").setColor("#ffffff").setInteractive();

		const renderStart = this.add.renderTexture(300, 300, 200, 90).setInteractive();
		renderStart.draw(graphics);
		renderStart.draw(startGame);
		renderStart.setInteractive();
		renderStart.on('pointerdown',  () => {
			this.scene.start('GameScene')
		}, this);

		startGame.destroy();

		const graphics2 = this.add.graphics();
		graphics2.fillStyle(0xfdadac,1);
		graphics2.fillRoundedRect(575, 300, 200, 90, 20);
		graphics2.setInteractive();
		
		const instructions = this.add.text(52, 35, "Instructions").setFont("20px Arial").setColor("#ffffff").setInteractive();

		const renderStart2 = this.add.renderTexture(575, 300, 200, 90);
		renderStart2.draw(graphics2);
		renderStart2.draw(instructions);

		instructions.destroy();
		

		
	}
}
