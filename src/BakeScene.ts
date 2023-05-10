import Phaser from "phaser";
import Frosting from "./Objects/Frosting";
import Liner from "./Objects/Liner";

export default class BakeScene extends Phaser.Scene {
  protected liner!: Liner;
  protected frosting!: Frosting;
  protected orderCount!: number;

  constructor() {
    super("BakeScene");
  }
  init(data: { liner: Liner; frosting: Frosting; count: number }) {
    this.frosting = data.frosting;
    this.liner = data.liner;
    this.orderCount = data.count;
  }
  preload() {
    this.load.image("bakery2", "assets/bakery.png");
    this.load.image("blue-liner", "assets/liner-blue.png");
    this.load.image("pink-liner", "assets/liner-pink.png");
    this.load.image("pink-frosting", "assets/pink-frosting.png");
    this.load.image("blue-frosting", "assets/blue-frosting.png");
    this.load.image("yellow-frosting", "assets/yellow-frosting.png");
    this.load.image("uparrow", "assets/uptriangle.png");
    this.load.image("downarrow", "assets/downtriangle.png");
  }

  create() {
    this.add.image(545, 305, "bakery2");
    let count = 0;
    const countText = this.add.text(292, 310, `${count}`).setFontSize(30);
    console.log(this.frosting.key);
    this.add.image(400, 290, this.frosting.key).setScale(0.2).setDepth(100);
    this.add.image(400, 350, this.liner.key).setScale(0.6);
    this.add
      .image(300, 280, "uparrow")
      .setScale(0.025)
      .setInteractive()
      .on("pointerdown", () => updateCount(++count));
    this.add
      .image(300, 370, "downarrow")
      .setScale(0.025)
      .setInteractive()
      .on("pointerdown", () => updateCount(--count));
    this.add
      .text(240, 390, "Finish Order")
      .setFontSize(20)
      .setInteractive()
      .on("pointerdown", () => createCupcakes(count));
    const finishedOrder = this.add
      .text(300, 120, "ORDER COMPLETED")
      .setFontSize(40);
    finishedOrder.setVisible(false);
    const createCupcakes = (count: number) => {
      let xCor = 450;
      for (let i = 1; i < count; i++) {
        this.add
          .image(xCor, 290, this.frosting.key)
          .setScale(0.2)
          .setDepth(100);
        this.add.image(xCor, 350, this.liner.key).setScale(0.6);
        xCor = xCor + 50;
      }
      this.time.addEvent({ delay: 500 });
      if (this.orderCount == count) {
        finishedOrder.setVisible(true);
      } else {
        finishedOrder.setVisible(false);
      }
    };
    function updateCount(count: number) {
      console.log(count);
      countText.setText(`${count}`);
    }
  }
}
