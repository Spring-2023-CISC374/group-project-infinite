import Phaser from 'phaser'
import Frosting from "./Objects/Frosting";
import Liner from "./Objects/Liner";
import Cupcake from './Objects/Cupcake';



export default class BakeScene extends Phaser.Scene {
    protected liner!: Liner
    protected frosting!: Frosting;

	constructor() {
        super("BakeScene");
	}
    init(data:{liner:Liner, frosting:Frosting}){
        this.frosting = data.frosting;
        this.liner = data.liner;
    }
    preload() {
        this.load.image('bakery2','assets/bakery.png')
        this.load.image('blue-liner', 'assets/liner-blue.png')
		this.load.image('pink-liner', 'assets/liner-pink.png')
		this.load.image('pink-frosting', 'assets/pink-frosting.png')
		this.load.image('blue-frosting', 'assets/blue-frosting.png')
        this.load.image('yellow-frosting', 'assets/yellow-frosting.png')
        this.load.image('uparrow', 'assets/uptriangle.png')
        this.load.image('downarrow', 'assets/downtriangle.png')

    }


    create() {
        let count = 0; 
        this.add.image(545, 305,'bakery2'); 
        console.log(this.frosting.key);
        this.add.image(400, 290, this.frosting.key).setScale(.2).setDepth(100);
        this.add.image(400, 350, this.liner.key).setScale(.6);
        this.add.image(550, 280, 'uparrow').setScale(.025).setInteractive().on('pointerdown', () => this.updateCount(++count));
        this.add.image(550, 370, 'downarrow').setScale(.025).setInteractive().on('pointerdown', () => this.updateCount(--count));

        function updateCount(count: number){
            console.log(count)
            //this.countText.setText(` hello ${count} `);
        }
    
    }

}