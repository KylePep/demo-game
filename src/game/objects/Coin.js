export class Coin {
  constructor(scene, x, y) {
    this.scene = scene;
    this.scale = Phaser.Math.RND.between(1, 6) / 2
    this.baseSpeed = this.scale


    this.coin = this.scene.add.sprite(x, y, 'star')
      .setDepth(50)
      .setScale(1 / this.scale);

    this.scene.physics.world.enable(this.coin);
    this.coin.body.setAllowGravity(false);  // Prevent gravity from affecting the coin
    this.coin.body.setImmovable(false);  // Ensure the coin doesn't move on collision
    this.coin.body.setSize(this.coin.width * 0.8, this.coin.height * 0.8);
  }

  update() {
    this.coin.y += this.scene.worldSpeed * this.baseSpeed;

    if (this.coin.y > this.scene.cameras.main.height + 32) {
      this.coin.y = -32;
      this.coin.x = this.scene.cameras.main.width * Phaser.Math.RND.between(0, 100) / 100;
      this.scene.updateScore()
      console.log('coin missed');
    }
  }

}