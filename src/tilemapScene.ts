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
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("kitchen", "tiles");
    const floor = map.createLayer("floor", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);
    const equipment = map.createLayer("stove", tileset, 0, 0);
    const objectLayer = map.getObjectLayer("objects");
    const objects = objectLayer.objects;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i].name === "stovetop") {
        // replace 'objectName' with the name of the object you want to get
        var object = objects[i];
        this.stove = object;
        break;
      }
    }

    console.log(this.stove);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(0, 0, "player").setScale(0.2);
    floor.setCollisionByProperty({ collides: true });
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, floor);
    this.physics.add.collider(this.player, this.stove, function () {
      // code to execute when the sprite collides with the tilemap object
    });
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
