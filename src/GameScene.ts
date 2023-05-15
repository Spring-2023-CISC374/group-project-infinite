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

  cupcakeCount = 0;

  coins = 0;

  private incorrect?: Phaser.GameObjects.Text;

  private correct?: Phaser.GameObjects.Text;

  orderText1?: Phaser.GameObjects.Text;

  private orderText2?: Phaser.GameObjects.Text;

  private cupcakeCountText?: Phaser.GameObjects.Text;

  //private cupcakeAnimationScene!: CupcakeAnimationScene;

  private deliveryBox: Phaser.GameObjects.Sprite | undefined;

  private coinCounterText?: Phaser.GameObjects.Text;

  orderLiner: Liner | undefined;
  orderFrosting: Frosting | undefined;
  flag = false;


  constructor() {
    super("GameScene");
  }
  init(data: { flag:boolean, coins: number}) {
    this.coins = data.coins;
    this.flag = data.flag;
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
    this.load.image("delivery-boxBlueBlue", "assets/deliveryboxBlueBlue.png")
    this.load.image("delivery-boxBluePink", "assets/deliveryboxBluePink.png")
    this.load.image("delivery-boxPinkBlue", "assets/deliveryboxPinkBlue.png")
    this.load.image("delivery-boxPinkPink", "assets/deliveryboxPinkPink.png")
    this.load.image("delivery-boxYellowBlue", "assets/deliveryboxYellowBlue.png")
    this.load.image("delivery-boxYellowPink", "assets/deliveryboxYellowPink.png")
  }

  create() {
    console.log(this.flag);
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
    this.add
      .text(35, 20, "Restart")
      .setFont("20px Arial")
      .setColor("#ffffff")
      .setInteractive();

    this.add.image(520, 20, "coin").setScale(0.05);
    this.coinCounterText = this.add.text(550, 10, `x ${this.coins}`, {
      fontSize: "24px"
    }).setColor("#000");

    this.orderText1 = this.add.text(109, 170, "Order:", {
      fontSize: "14px",
      color: "#000",
    });
    this.orderText2 = this.add.text(78, 195, `Liner: \nFrosting: `, {
      fontSize: "12.5px",
      color: "#000",
    });
    
    this.updateOrder();

    this.correct = this.add
    .text(150, 350, "Correct")
    .setFontSize(20)
    .setVisible(false);

    this.incorrect = this.add
    .text(150, 350, "Incorrect, Try Again!")
    .setFontSize(20)
    .setVisible(false);


    this.deliveryBox = this.add.sprite(740, 320, "delivery-box").setScale(0.7);

    this.cupcakeCountText = this.add.text(760, 288, `${this.cupcakeCount}`).setFontSize(30).setColor("#000").setVisible(true);

    this.updateDeliveryBox();

    const finishCupcake = this.add
      .text(460, 350, "Bake Cupcake")
      .setFontSize(20);
    finishCupcake.setInteractive();
    finishCupcake.on("pointerdown", () => {
      if (this.userCupcake != null) {
        if (!this.flag) {
          if (this.userCupcake.frosting === this.orderFrosting && this.userCupcake.liner === this.orderLiner) {
            this.cupcakeCount++;
            this.correct!.setVisible(true);
            this.incorrect!.setVisible(false);
            this.userCupcake.reset();
          } else {
            this.incorrect!.setVisible(true);
            this.correct!.setVisible(false);
            this.userCupcake.reset();
          }
        } else {
          this.userCupcake.printCupcake();
          this.coins = this.coins + this.count;
          this.updateCoinCounter();
          this.scene.start("BakeScene", this.getCupcake());
          // call the create method of the existing instance
          //this.cupcakeAnimationScene.create(this.getCupcake());
        }
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
        this.scene.start("StoreScene", {gamecoins: this.coins});
      },
      this
    );
  }

  startBakeScene(): void {
    if (this.userCupcake != null) {
      this.userCupcake.printCupcake();
      this.scene.start("CupcakeAnimationScene");
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
      coins: this.coins
    };
  }

  update() {
    this.updateCupcake();
    this.updateCupcakeText();
    this.updateCoinCounterText();
  }


  updateCupcakeText(){
    if(this.cupcakeCount == this.count){
      this.updateOrder();
      this.updateCoinCounter();
      this.updateDeliveryBox();
      this.cupcakeCount = 0;
    }
    this.cupcakeCountText?.setText(`${this.cupcakeCount}`);

  }


  updateOrder(){
    const liners = [this.blueLiner, this.pinkLiner];
      const frostings = [
        this.yellowFrosting,
        this.blueFrosting,
        this.pinkFrosting,
      ];
      const counts = [1, 2, 4, 6, 8];

      this.count = counts[Math.floor(Math.random() * counts.length)];

      this.orderLiner = liners[Math.floor(Math.random() * liners.length)];
      this.orderFrosting =
        frostings[Math.floor(Math.random() * frostings.length)];

      this.orderText2?.setText(
        `Liner: ${this.orderLiner?.key.substring(
          0,
          this.orderLiner?.key.indexOf("-")
        )}\nFrosting: ${this.orderFrosting?.key.substring(
          0,
          this.orderFrosting?.key.indexOf("-")
        )}\nCount: ${this.count}`
      );
  
  }

  updateCoinCounter(){
    this.coins++;
    this.coinCounterText?.setText(`x ${this.coins}`);
  }
  updateCoinCounterText(){
    this.coinCounterText?.setText(`x ${this.coins}`);
  }

  updateDeliveryBox(){
    if(this.orderFrosting === this.yellowFrosting){
      if(this.orderLiner === this.blueLiner){
        this.deliveryBox?.setTexture("delivery-boxYellowBlue");
      }else if(this.orderLiner === this.pinkLiner){
        this.deliveryBox?.setTexture("delivery-boxYellowPink");
      }
    }else if(this.orderFrosting === this.blueFrosting){
      if(this.orderLiner === this.blueLiner){
        this.deliveryBox?.setTexture("delivery-boxBlueBlue");
      }else if(this.orderLiner === this.pinkLiner){
        this.deliveryBox?.setTexture("delivery-boxBluePink");
      }
    }else if(this.orderFrosting === this.pinkFrosting){
      if(this.orderLiner === this.blueLiner){
        this.deliveryBox?.setTexture("delivery-boxPinkBlue");
      }else if(this.orderLiner === this.pinkLiner){
        this.deliveryBox?.setTexture("delivery-boxPinkPink");
      }
    }
  }


}
