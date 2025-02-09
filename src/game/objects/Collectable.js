import { Coin } from "./Coin.js";

export class Collectable {
  constructor(scene, x, y) {
    this.scene = scene;
    this.interval = 1000;
    this.x = x;
    this.y = y;

    this.coins = [];

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
    // Create a new coin and add it to the coins array
    const coin = new Coin(this.scene, this.scene.cameras.main.width * Phaser.Math.RND.between(0, 100) / 100, this.y);
    this.coins.push(coin);
  }

  update() {
    // Loop through all coins and call their update methods
    for (let coin of this.coins) {
      coin.update();
    }
  }
}