import Phaser from "phaser";

export default class tilemapScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private stove?: Phaser.Types.Tilemaps.TiledObject;
  private promptText?: Phaser.GameObjects.Text;
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
    //this.cameras.main.setSize(12 * 16, 6 * 16);
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("kitchen", "tiles");
    const floor = map.createLayer("floor", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);
    const equipment = map.createLayer("equipment", tileset, 0, 0);
    const stove = map.createLayer("stove", tileset, 0, 0);
    floor.setScale(5.667);
    background.setScale(5.667);
    equipment.setScale(5.667);
    stove.setScale(5.667);
    this.promptText = this.add
      .text(0, 0, "Press E to bake!", {
        fontFamily: "Arial",
        fontSize: "10px",
        color: "#000",
      })
      .setVisible(false);

    const handleCollision = () => {
      this.promptText?.setVisible(true);
      this.input.keyboard.once("keydown", (event: KeyboardEvent) => {
        if (event.key === "e") {
          this.scene.start("GameScene");
        }
      });
    };

    console.log(this.stove);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(0, 0, "player");

    floor.setCollisionByProperty({ collides: true });
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, floor);
    stove.setTileIndexCallback(111, handleCollision, this);
    this.physics.add.overlap(this.player, stove);
  }

  update() {
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      this.player?.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player?.setVelocityX(300);
    } else {
      this.player?.setVelocityX(0);
    }
  }
}
