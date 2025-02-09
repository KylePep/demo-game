import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x34abeb);

        // Get camera dimensions
        const { width, height } = this.cameras.main;

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

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height * .9, 'Quit', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setInteractive().on('pointerdown', () => this.changeScene())

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    update() {
        this.bg1.tilePositionY -= 1;
        this.bg2.tilePositionY -= .5;
        this.fg1.tilePositionY -= 2;
    }
}
