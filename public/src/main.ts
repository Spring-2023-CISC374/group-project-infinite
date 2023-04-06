import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import GameScene from './GameScene'
import KitchenScene from './KitchenScene'
import InstructionsScene from './InstructionsScene'; 
import StoreScene from './StoreScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1090,
	height: 610,
	physics: {  
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [HelloWorldScene, KitchenScene, GameScene, InstructionsScene, StoreScene]
}

export default new Phaser.Game(config)

