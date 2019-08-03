import * as Phaser from "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;
import { MainScene } from "MainScene";

class App extends Phaser.Game {

  constructor(config: GameConfig) {
    super(config);
  }

}

const config: GameConfig = {
  "type": Phaser.WEBGL,
  "width": 1600,
  "height": 900,
  "physics": {
    "default": "arcade",
    "arcade": {
      "gravity": { "y": 200 },
    },
  },
  "scene": [MainScene],
  "fps": {
    "target": 24,
  },
};

new App(config);
