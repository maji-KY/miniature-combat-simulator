import * as Phaser from "phaser";
import fighter from "assets/fighter.png";
import Image = Phaser.Physics.Arcade.Image;

export class FighterScene extends Phaser.Scene {

  constructor() {
    super({
      "key": "FighterScene",
    });
  }

  init(params): void {
  }

  preload(): void {
    this.load.image("fighter", fighter);
    this.load.image("red", "http://labs.phaser.io/assets/particles/red.png");

  }

  fighter: Image;

  create(): void {

    this.add.image(400, 300, "sky");

    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      "speed": 100,
      "scale": {"start": 1, "end": 0},
      "blendMode": "ADD",
    });

    this.fighter = this.physics.add.image(128, 128, "fighter");

    this.fighter.setBounce(1, 1);
    this.fighter.setCollideWorldBounds(true);

    emitter.startFollow(this.fighter);
  }

  update(time): void {
    let rotation = this.fighter.rotation;
    rotation += 0.01;
    this.fighter.setRotation(rotation);
    const vec = this.physics.velocityFromRotation(rotation - Math.PI / 2, 100);
    this.fighter.setVelocity(vec.x, vec.y);
  }

}
