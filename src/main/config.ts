import * as Phaser from "phaser";
import CreateSceneFromObjectConfig = Phaser.Types.Scenes.CreateSceneFromObjectConfig;

export function genConfig(scene: CreateSceneFromObjectConfig): Phaser.Types.Core.GameConfig {
  return {
    "type": Phaser.AUTO,
    "width": 1600,
    "height": 900,
    "physics": {
      "default": "arcade",
      "arcade": {
        "gravity": { "y": 200 },
      },
    },
    scene,
  };
}
