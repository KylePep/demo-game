import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create(score) {
        this.cameras.main.setBackgroundColor(0xff0000);

        const { width, height } = this.cameras.main;

        this.background = this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(width, height)
            .setAlpha(0.5);

        this.add.text(width / 2, height / 4, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100)

        this.add.text(width / 2, height / 2, 'Restart', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(200)
            .setInteractive().on('pointerdown', () => this.changeScene())

        this.add.text(width / 2, height * .75, `Score: ${score}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(200)
            .setInteractive().on('pointerdown', () => this.changeScene())

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}
