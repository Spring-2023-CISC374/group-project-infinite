import Phaser from "phaser";

export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super("InstructionsScene");
  }

  preload() {
    this.load.image("instructions", "assets/dessertbackground.png");
  }

  create() {
    this.add.image(545, 305, "instructions");

    const backButton = this.add
      .text(20, 20, "Back")
      .setFont("23px Arial")
      .setColor("#ffffff")
      .setInteractive();
    backButton.on(
      "pointerdown",
      () => {
        this.scene.start("bootGame");
      },
      this
    );

    this.add
      .text(
        300,
        160,
        "Welcome to the bakery!\n\nHere are some instructions:\n\n1. Drag the frosting and liner together to make a cupcake.\n\n2. Earns coins to use at the store.\n\n3. Enjoy your gaming experience!"
      )
      .setFont("25px Arial")
      .setAlign("center")
      .setColor("#000000");
  }
}
