import Phaser from "phaser";

export default class StoreScene extends Phaser.Scene {
  
  constructor() {
    super("StoreScene");
  }
    
  visible = true;
  preload() {
    this.load.image("store", "assets/dessertbackground.png");
    this.load.image("purpleFrosting", "assets/purple-frosting.png");
    this.load.image("coin", "assets/coin.png");
  }

  create() {
    const storeButton = this.add
      .text(320, 20, "Store")
      .setFont("25px Arial")
      .setColor("#ffffff")
      .setInteractive();

    this.add.image(545, 305, "store");

    storeButton.on(
      "pointerdown",
      () => {
        this.scene.start("StoreScene");
      },
      this
    );

    const backButton = this.add
      .text(20, 20, "Back")
      .setFont("23px Arial")
      .setColor("#ffffff")
      .setInteractive();

    backButton.on(
      "pointerdown",
      () => {
        this.scene.start("GameScene");
      },
      this
    );

    this.add.text(250, 200, "Speed Baker    5 ").setColor("black");
    this.add.image(382, 207, "coin").setScale(.04);
    let purchase = this.add.graphics().setVisible(false);
    purchase.fillStyle(0x000000, 1);
    purchase = purchase.fillRoundedRect(650, 195, 100, 25, 10).setInteractive();
    const purchasetxt = this.add.text(660, 200, "Purchase").setColor("white").setInteractive().setVisible(false);
    purchasetxt.on("pointerdown", () => this.startGameScene());
    if(this.visible){
      purchase.setVisible(true);
      purchasetxt.setVisible(true);
    }
  }
  startGameScene(){
    if(this.visible){
      this.visible = false;
    }
    this.scene.start("GameScene",{flag: true});
    

  }
}
