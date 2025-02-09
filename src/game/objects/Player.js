export class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.player = this.scene.add.sprite(x, y, 'star')
      .setDepth(50)

    // Setup keyboard input (A and D keys)
    this.keys = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S
    });

    // Movement speed
    this.speed = 5;

    // Get the game world's width for boundary checks
    this.worldWidth = this.scene.cameras.main.width;
  }

  update() {
    // Move left
    if (this.keys.left.isDown) {
      this.player.x -= this.speed;
    }
    // Move right
    if (this.keys.right.isDown) {
      this.player.x += this.speed;
    }

    if (this.keys.up.isDown) {
      this.scene.worldSpeed = 2;
    }

    if (this.keys.down.isDown) {
      this.scene.worldSpeed = 0.5;
    }
    if (!this.keys.down.isDown && !this.keys.up.isDown) {
      this.scene.worldSpeed = 1;
    }

    // Wrap around the screen
    if (this.player.x < 0) {
      this.player.x = this.worldWidth; // Move to the right side
    } else if (this.player.x > this.worldWidth) {
      this.player.x = 0; // Move to the left side
    }
  }
}