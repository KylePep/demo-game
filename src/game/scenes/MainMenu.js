import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 4, 'logo').setDepth(100);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setInteractive().on('pointerdown', () => this.changeScene())


        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {

        this.scene.start('Game');
    }
}
