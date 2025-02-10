import { Coin } from "./Coin.js";

export class Collectable {
  constructor(scene, x, y) {
    this.scene = scene;
    this.interval = 1000;
    this.x = x;
    this.y = y;

    // Create a physics group for coins
    this.coinsGroup = this.scene.physics.add.group();

    this.startCoinGen();
  }

  startCoinGen() {
    this.scene.time.addEvent({
      delay: this.interval,
      callback: this.createCoin,
      callbackScope: this,
      loop: true
    });
  }

  createCoin() {
    console.log('addCoin')
    // Create a new coin and add it to the physics group
    const coin = new Coin(this.scene, this.scene.cameras.main.width * Phaser.Math.RND.between(0, 100) / 100, this.y);

    // Add coin to the physics group (this ensures it's part of physics world)
    this.coinsGroup.add(coin.coin);
  }

  update() {
    // Loop through all coins in the physics group and update them
    this.coinsGroup.children.iterate((coin) => {
      if (coin) {
        coin.y += this.scene.worldSpeed * coin.baseSpeed;
        if (coin.y > this.scene.cameras.main.height + 32) {
          coin.y = -32;
          coin.x = this.scene.cameras.main.width * Phaser.Math.RND.between(0, 100) / 100;
          this.scene.updateScore();
          console.log('coin missed');
        }
      }
    });
  }
}
