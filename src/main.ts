import Phaser from "phaser";

import HelloWorldScene from "./HelloWorldScene";
import GameScene from "./GameScene";
import InstructionsScene from "./InstructionScene";
import StoreScene from "./StoreScene";
import BakeScene from "./BakeScene";
import tilemapScene from "./tilemapScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1090,
  height: 610,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [
    HelloWorldScene,
    GameScene,
    tilemapScene,
    BakeScene,
    InstructionsScene,
    StoreScene,
  ],
};

export default new Phaser.Game(config);
