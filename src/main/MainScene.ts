import * as Phaser from "phaser";
import {FighterScene} from "./FighterScene";

export class MainScene extends Phaser.Scene {

  constructor() {
    super({
      "key": "MainScene",
    });
  }

  init(params): void {
  }

  preload(): void {
    this.load.setBaseURL("http://labs.phaser.io");
    this.load.image("sky", "assets/skies/space3.png");
  }

  create(): void {
    this.add.image(1600, 900, "sky");
    this.scene.add("FighterScene", FighterScene, true);
  }

}
