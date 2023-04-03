import Phaser from 'phaser'

export default class KitchenScene extends Phaser.Scene {
    constructor() {
        super("KitchenScene")
    }

    preload() {
        this.load.image("kitchen", "assets/kitchen.jpeg")
    }

    create() {
        this.add.image(545, 305, "kitchen")
        
    }
}
