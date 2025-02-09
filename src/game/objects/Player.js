export class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.player = this.scene.add.sprite(x, y, 'star')
      .setDepth(50)

    this.scene.physics.world.enable(this.player);

    // Setup keyboard input (A and D keys)
    this.keys = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
      downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN
    });

    // Movement speed
    this.speed = 5;

    // Get the game world's width for boundary checks
    this.worldWidth = this.scene.cameras.main.width;

  }

  update() {
    // Move left
    if (this.keys.left.isDown || this.keys.leftArrow.isDown) {
      this.player.x -= this.speed;
    }
    // Move right
    if (this.keys.right.isDown || this.keys.rightArrow.isDown) {
      this.player.x += this.speed;
    }

    if (this.keys.up.isDown || this.keys.upArrow.isDown) {
      this.scene.worldSpeed = 2;
    }

    if (this.keys.down.isDown || this.keys.downArrow.isDown) {
      this.scene.worldSpeed = 0.5;
    }
    if (!this.keys.down.isDown && !this.keys.up.isDown && !this.keys.downArrow.isDown && !this.keys.upArrow.isDown) {
      this.scene.worldSpeed = 1;
    }

    // Wrap around the screen
    if (this.player.x < 0) {
      this.player.x = this.worldWidth; // Move to the right side
    } else if (this.player.x > this.worldWidth) {
      this.player.x = 0; // Move to the left side
    }

    // Check for collisions with coins
    this.scene.collectable.coins.forEach((coin) => {
      if (this.checkCollision(this.player, coin.coin)) {
        this.collectItem(coin);
      }
    });
  }

  checkCollision(player, coin) {
    // Check for rectangle-to-rectangle collision
    return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), coin.getBounds());
  }

  collectItem(coin) {
    // Logic for when the player collects a coin
    console.log('Coin collected!');
    this.scene.updateHealth()
    coin.coin.destroy(); // Remove the coin from the scene
    const index = this.scene.collectable.coins.indexOf(coin);
    if (index > -1) {
      this.scene.collectable.coins.splice(index, 1); // Remove coin from the array
    }
  }
}