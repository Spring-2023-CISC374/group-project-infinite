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

    this.load.image("player1", "assets/bakerLeft.png");
    this.load.image("player2", "assets/bakerRight.png");
    this.load.image("tiles", "assets/tileset.png");

    // load the JSON file
    this.load.tilemapTiledJSON("map", "assets/game.json");
  }

  create() {
    this.scale.setGameSize(1152, 576);
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("kitchen", "tiles");
    const floor = map.createLayer("floor", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);
    const equipment = map.createLayer("equipment", tileset, 0, 0);
    const stove = map.createLayer("stove", tileset, 0, 0);
    floor.setScale(6);
    background.setScale(6);
    equipment.setScale(6);
    stove.setScale(6);
    this.promptText = this.add
      .text(550, 0, "Press E on oven to bake!", {
        fontFamily: "Arial",
        fontSize: "50px",
        color: "#000",
      })
      .setVisible(true);

    const backButton = this.add
      .text(16, 20, "Back")
      .setFont("23px Arial")
      .setColor("#000")
      .setInteractive();
    backButton.on(
      "pointerdown",
      () => {
        this.scene.start("bootGame");
        this.scale.setGameSize(1090, 610);
      },
      this
    );
    let startScene = false;
    const handleCollision = () => {
      this.input.keyboard.once("keydown", (event: KeyboardEvent) => {
        if (event.key === "e" && !startScene) {
          this.scene.start("GameScene");
          this.scale.setGameSize(1090, 610);
          startScene = true;
        }
      });
    };

    console.log(this.stove);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(0, 0, "player2");

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
      this.player?.setTexture("player1");
    } else if (this.cursors.right.isDown) {
      this.player?.setVelocityX(300);
      this.player?.setTexture("player2");
    } else {
      this.player?.setVelocityX(0);
    }
  }
}
