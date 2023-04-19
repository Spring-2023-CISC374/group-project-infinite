import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import GameScene from './GameScene'
import KitchenScene from './KitchenScene'
import InstructionsScene from './InstructionScene'; 
import StoreScene from './StoreScene';
import tilemapScene from './tilemapScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 12 * 16,
	height: 6 * 16,
	zoom: 4,
	pixelArt: true,
	physics: {  
		default: 'matter',
		matter: {
			debug: true
		}
	},
	scene: [tilemapScene, HelloWorldScene, KitchenScene, GameScene, InstructionsScene, StoreScene]
}

export default new Phaser.Game(config)

