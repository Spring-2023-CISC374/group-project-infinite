import Phaser from "phaser";

export default class tilemapScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private stove?: Phaser.Types.Tilemaps.TiledObject;
  constructor() {
    super("tilemapScene");
  }
  preload() {
    // load the PNG file

    this.load.image("player", "assets/baker.png");
    this.load.image("tiles", "assets/tileset.png");

    // load the JSON file
    this.load.tilemapTiledJSON("map", "assets/game.json");
  }

  create() {
    let collisionDetected = false;

    function handleCollision() {
      if (!collisionDetected) {
        console.log("Collision detected!");
        collisionDetected = true;
      }
    }
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("kitchen", "tiles");
    const floor = map.createLayer("floor", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);
    const equipment = map.createLayer("equipment", tileset, 0, 0);
    const stove = map.createLayer("stove", tileset, 0, 0);

    console.log(this.stove);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(0, 0, "player").setScale(0.2);
    stove.setCollisionByProperty({ collides: false });
    floor.setCollisionByProperty({ collides: true });
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, floor);
    this.physics.add.collider(this.player, stove, handleCollision, null, this);
    this.physics.add.collider(
      this.player,
      stove,
      () => {
        collisionDetected = false;
      },
      null,
      this
    );
  }

  update() {
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      this.player?.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player?.setVelocityX(100);
    } else {
      this.player?.setVelocityX(0);
    }
  }
}
