import Phaser from 'phaser'

export default class tilemapScene extends Phaser.Scene {
	private player?: Phaser.Physics.Matter.Sprite;
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(){
        super('tilemapScene')
    }
    preload(){
	// load the PNG file

	this.load.image("player", "assets/baker.png");
	this.load.image('tiles', 'assets/tileset.png')


	// load the JSON file
	this.load.tilemapTiledJSON('tilemap', 'assets/game.json')
	}

create(){

	
	this.cursors = this.input.keyboard.createCursorKeys();

	const map = this.make.tilemap({key: 'tilemap'})
	const tileset = map.addTilesetImage("kitchen", "tiles")

	const floor = map.createLayer('floor', tileset)
	floor.setCollisionByProperty({ collides: true})

	const background = map.createLayer('background', tileset)
	const stove =  map.createLayer('stove', tileset)


	this.player?.setScale(.8)
	this.matter.world.convertTilemapLayer(floor)

	const {width, height} = this.scale	
	this.player = this.matter.add.sprite(width * 0.1, height * 0.1, 'player')

    const camera = this.cameras.main;
    
    // set the initial camera zoom and position

    // add a key listener to zoom in when the 'Z' key is pressed
    this.input.keyboard.on('keydown-Z', () => {
        camera.zoomTo(2, 1000);
    });

	}

	update() {
        if (!this.cursors) return;
  
		if (this.cursors.left.isDown) {
			this.player?.setVelocityX(-30);
		}
		else if (this.cursors.right.isDown) {
			this.player?.setVelocityX(30);
		}

		else {
			this.player?.setVelocityX(0);
		}

    }
}