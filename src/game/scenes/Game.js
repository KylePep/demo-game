import { EventBus } from '../EventBus';
import { Player } from "../objects/Player.js";
import { Collectable } from "../objects/Collectable.js";

export class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game',
            physics: {
                default: 'arcade',  // Use arcade physics
                arcade: {
                    gravity: { y: 0 },  // Optional: Set gravity, adjust as needed
                    debug: false         // Optional: Set to true if you want to see debug info
                }
            }
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0x34abeb);

        this.worldSpeed = 1;
        this.score = 0;
        this.health = 5;

        // Get camera dimensions
        const { width, height } = this.cameras.main;

        this.player = new Player(this, width / 2, height * .75);
        this.collectable = new Collectable(this, width / 2, 0);

        // Create a tileSprite that fills the screen
        this.bg1 = this.add.tileSprite(0, 0, width, height, 'clouds')
            .setOrigin(0, 0)
            .setDepth(-100)
            .setAlpha(0.75);


        // Create a tileSprite that fills the screen
        this.bg2 = this.add.tileSprite(0, 0, width, height, 'clouds')
            .setOrigin(0, 0)
            .setAlpha(0.6);

        // Create a tileSprite that fills the screen
        this.fg1 = this.add.tileSprite(0, 0, width, height, 'clouds')
            .setOrigin(0, 0)
            .setAlpha(0.35)
            .setDepth(100);

        // Scale each tile to match the full screen
        this.bg1.setTileScale(1, 1);
        this.bg2.setTileScale(4, 4);
        this.fg1.setTileScale(8, 8);

        this.add.text(width / 2, height * .9, 'Quit', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(200)
            .setInteractive().on('pointerdown', () => this.changeScene())

        this.scoreDisplay = this.add.text(32, 32, `Score: ${this.score}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0)
            .setDepth(200)

        this.healthDisplay = this.add.text(width - 32, 32, `Health: ${this.health}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(1, 0)
            .setDepth(200)

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    update() {
        this.bg1.tilePositionY -= 1 * this.worldSpeed;
        this.bg2.tilePositionY -= .5 * this.worldSpeed;
        this.fg1.tilePositionY -= 2 * this.worldSpeed;

        this.player.update();
        this.collectable.update();
    }

    updateScore() {
        console.log('score update')
        this.score += 1;
        this.scoreDisplay.setText(`Score: ${this.score}`)
    }

    updateHealth() {
        console.log('lose health')
        this.health -= 1;
        if (this.health <= 0) {
            this.changeScene();
        }
        this.healthDisplay.setText(`Health: ${this.health}`)
    }
}
