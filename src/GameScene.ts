import Phaser from "phaser";
import Frosting from "./Objects/Frosting";
import Liner from "./Objects/Liner";
import DropZoneGraphic from "./Objects/DropZoneGraphic";
import DropZone from "./Objects/DropZone";
import Cupcake from "./Objects/Cupcake";

export default class GameScene extends Phaser.Scene {
  linerZone?: DropZone;
  linerZoneGraphic?: DropZoneGraphic;

  frostingZone?: DropZone;
  frostingZoneGraphic?: DropZoneGraphic;

  blueFrosting?: Frosting;
  pinkFrosting?: Frosting;
  yellowFrosting?: Frosting;

  blueLiner?: Liner;
  pinkLiner?: Liner;

  count = 5;

  userCupcake: Cupcake | null = null;

  private cupcakeAnimationScene!: CupcakeAnimationScene;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bakery2", "assets/third_bakery.png");
    this.load.image("blue-liner", "assets/liner-blue.png");
    this.load.image("pink-liner", "assets/liner-pink.png");
    this.load.image("pink-frosting", "assets/pink-frosting.png");
    this.load.image("blue-frosting", "assets/blue-frosting.png");
    this.load.image("yellow-frosting", "assets/yellow-frosting.png");
    this.load.image("delivery-box", "assets/deliverybox3.png");
    this.load.image("coin", "assets/coin.png");
  }

  create() {
    this.add.image(550, 303, "bakery2").setScale(0.671);
    this.linerZone = new DropZone(this, 400, 350, "linerZone");
    this.linerZoneGraphic = new DropZoneGraphic(this, 400, 350);

    this.frostingZone = new DropZone(this, 400, 275, "frostingZone");
    this.frostingZoneGraphic = new DropZoneGraphic(this, 400, 275);

    this.blueFrosting = new Frosting(
      this,
      540,
      575,
      "blue-frosting",
      this.frostingZone
    );
    this.pinkFrosting = new Frosting(
      this,
      740,
      575,
      "pink-frosting",
      this.frostingZone
    );
    this.yellowFrosting = new Frosting(
      this,
      930,
      575,
      "yellow-frosting",
      this.frostingZone
    );

    this.pinkLiner = new Liner(this, 150, 570, "pink-liner", this.linerZone);
    this.blueLiner = new Liner(this, 250, 570, "blue-liner", this.linerZone);

    this.add
      .graphics({ fillStyle: { color: 0xfdadac } })
      .fillEllipse(70, 30, 120, 50);
    const startGame = this.add
      .text(35, 20, "Restart")
      .setFont("20px Arial")
      .setColor("#ffffff")
      .setInteractive();

    let coins = 0;
    const coinImage = this.add.image(520, 20, "coin").setScale(0.05);
    const coinCounterText = this.add.text(550, 10, `x ${coins}`, {
      fontSize: "24px",
      fill: "#000",
    });

    const orderText1 = this.add.text(109, 170, "Order:", {
      fontSize: "14px",
      color: "#000",
    });
    const orderText2 = this.add.text(78, 195, `Liner: \nFrosting: `, {
      fontSize: "12.5px",
      color: "#000",
    });

    const deliveryBox = this.add.sprite(740, 320, "delivery-box").setScale(0.5);;

    const updateOrder = () => {
      const liners = [this.blueLiner, this.pinkLiner];
      const frostings = [this.yellowFrosting, this.blueFrosting, this.pinkFrosting];
      const counts = [1, 2, 4, 6, 8]

      if(this.flag == false){
        this.count = 1;
      }else{
        this.count = counts[Math.floor(Math.random() * counts.length)]
      }

      this.orderLiner = liners[Math.floor(Math.random() * liners.length)];
      this.orderFrosting =
        frostings[Math.floor(Math.random() * frostings.length)];

      orderText2.setText(`Liner: ${this.orderLiner?.key.substring(0,this.orderLiner?.key.indexOf('-'))}\nFrosting: ${this.orderFrosting?.key.substring(0,this.orderFrosting?.key.indexOf('-'))}\nCount: ${this.count}`);
    };

    updateOrder();

    const updateCoinCounter = () => {
      coins++;
      coinCounterText.setText(`x ${coins}`);
    };

    const finishCupcake = this.add
    .text(460, 350, "Bake Cupcake")
    .setFontSize(20);
  finishCupcake.setInteractive();
  finishCupcake.on("pointerdown", () => {
    if (this.userCupcake != null) {
      this.userCupcake.printCupcake();
      this.scene.start("BakeScene", this.getCupcake());
      // call the create method of the existing instance
      this.cupcakeAnimationScene.create(this.getCupcake());
      }
    });

    const storeButton = this.add
      .text(960, 20, "Store")
      .setFont("32px Arial")
      .setColor("#ffffff")
      .setInteractive();

    storeButton.on(
      "pointerdown",
      () => {
        this.scene.start("StoreScene");
      },
      this
    );
  }

  startBakeScene(): void {
    if (this.userCupcake != null) {
      this.userCupcake.printCupcake();
      this.scene.start('CupcakeAnimationScene');
    }
  }
  

  updateCupcake(): void {
    if (!this.frostingZone || !this.linerZone) return;

    if (!this.frostingZone.hasItem() || !this.linerZone.hasItem()) {
      this.userCupcake = null;
      return;
    }

    if (this.userCupcake) return;

    if (this.frostingZone.currItem && this.linerZone.currItem) {
      this.userCupcake = new Cupcake(
        this.frostingZone.currItem,
        this.linerZone.currItem
      );
      this.userCupcake.printCupcake();
      return;
    }
  }
  getCupcake() {
    return {
      liner: this.userCupcake?.liner,
      frosting: this.userCupcake?.frosting,
      count: this.count,
    };
  }

  update() {
    this.updateCupcake();
  }
}
