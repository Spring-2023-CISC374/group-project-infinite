import Phaser from "phaser";
import Frosting from "./Objects/Frosting";
import Liner from "./Objects/Liner";
import Cupcake from "./Objects/Cupcake";

export default class BakeScene extends Phaser.Scene {
  protected liner!: Liner;
  protected frosting!: Frosting;
  protected orderCount!: number;
  private incorrect?: Phaser.GameObjects.Text;
  private coins?: number;

  private correct?: Phaser.GameObjects.Text;
  constructor() {
    super("BakeScene");
  }
  count = 0;
  init(data: { liner: Liner; frosting: Frosting; count: number, coins:number}) {
    this.frosting = data.frosting;
    this.liner = data.liner;
    this.orderCount = data.count;
    this.coins = data.coins;
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
    const countText = this.add.text(292, 310, `${this.count}`).setFontSize(30);
    console.log(this.frosting.key);
    this.add.image(400, 290, this.frosting.key).setScale(0.2).setDepth(100);
    this.add.image(400, 350, this.liner.key).setScale(0.6);
    
    this.correct = this.add
    .text(150, 350, "Correct")
    .setFontSize(20)
    .setVisible(false);

    this.incorrect = this.add
    .text(150, 350, "Incorrect, Try Again!")
    .setFontSize(20)
    .setVisible(false);
    
    this.add
      .image(300, 280, "uparrow")
      .setScale(0.025)
      .setInteractive()
      .on("pointerdown", () => updateCount(++this.count));
    this.add
      .image(300, 370, "downarrow")
      .setScale(0.025)
      .setInteractive()
      .on("pointerdown", () => updateCount(--this.count));
    const FinishOrder = this.add
      .text(240, 390, "Finish Order")
      .setFontSize(20)
      .setInteractive()
    const finishedOrder = this.add
      .text(300, 120, "ORDER COMPLETED")
      .setFontSize(40);
    finishedOrder.setVisible(false);
    FinishOrder.on("pointerdown", () =>  this.startGameScene());
    function updateCount(count: number) {
      console.log(count);
      countText.setText(`${count}`);
    }
  }
  startGameScene(){
    if(this.count != this.orderCount){
      this.incorrect?.setVisible(true)
    }else{
      this.scene.start("GameScene", {flag: true, coins: this.coins});
    }
  }
}
