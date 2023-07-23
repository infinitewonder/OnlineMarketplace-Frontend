import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  game: Phaser.Game;
  scene: Phaser.Scene;
  item: Phaser.Physics.Arcade.Image;

  constructor() {}

  ngOnInit() {
    const config: Phaser.Types.Core.GameConfig = {
      title: 'Sample',
      parent: 'gameContainer',
      width: 800,
      height: 600,
      type: Phaser.AUTO,
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      },
    };

    this.game = new Phaser.Game(config);
  }

  preload(): void {
    this.load.image('item', 'assets//item.png'); // Replace item.png with the path to your own asset.
  }

  create(): void {
    // Create item at random position
    this.item = this.physics.add.image(
      Phaser.Math.Between(0, 800),
      Phaser.Math.Between(0, 600),
      'item'
    );
    this.item.setInteractive();

    // Register click event
    this.item.on('pointerdown', (pointer) => {
      // Increase score, POST to backend, etc. Handle it here.
    });
  }

  update(): void {
    // Move item to random position
    this.item.x = Phaser.Math.Between(0, 800);
    this.item.y = Phaser.Math.Between(0, 600);
  }

  ngOnDestroy() {
    this.game.destroy(true);
  }
}
