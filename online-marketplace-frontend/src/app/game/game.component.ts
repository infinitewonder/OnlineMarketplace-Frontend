import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  game!: Phaser.Game;
  item!: Phaser.GameObjects.Image;

  constructor() {}

  ngOnInit(): void {
    const config: Phaser.Types.Core.GameConfig = {
      title: 'Sample',
      parent: 'gameContainer',
      width: 800,
      height: 600,
      type: Phaser.AUTO,
      scene: [MainScene],
    };
    this.game = new Phaser.Game(config);
  }

  ngOnDestroy(): void {
    this.game.destroy(true);
  }
}

class MainScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Image;
  gameComponent!: GameComponent;

  constructor() {
    super({ key: 'main' });
  }

  preload(): void {
    this.load.image('item', 'assets/item.png');
  }

  create(): void {
    this.item = this.add.image(
      Phaser.Math.Between(0, 800),
      Phaser.Math.Between(0, 600),
      'item'
    );
    this.item.setInteractive();
    this.item.on('pointerdown', (_pointer: any) => {
      // Increase score, POST to backend etc. Handle it here.
    });
    this.time.addEvent({
      delay: 2000,
      callback: this.moveItem,
      callbackScope: this,
      loop: true,
    });
  }

  moveItem(): void {
    this.item.x = Phaser.Math.Between(0, 800);
    this.item.y = Phaser.Math.Between(0, 600);
  }
}
