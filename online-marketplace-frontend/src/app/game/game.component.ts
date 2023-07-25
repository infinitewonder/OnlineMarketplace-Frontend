import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  score!: number;
  game!: Phaser.Game;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    const mainScene = new MainScene(this.gameService);

    const config: Phaser.Types.Core.GameConfig = {
      title: 'Sample',
      parent: 'gameContainer',
      width: 800,
      height: 600,
      type: Phaser.AUTO,
      scene: [mainScene],
    };

    this.game = new Phaser.Game(config);
  }

  getScore(): number {
    return this.gameService.getScore();
  }

  ngOnDestroy(): void {
    this.gameService.postScore();
    this.game.destroy(true);
  }
}

class MainScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Image;
  spawnTime!: number;
  gameService: GameService;

  constructor(gameService: GameService) {
    super({ key: 'main' });
    this.gameService = gameService;
  }

  preload(): void {
    this.load.image('thumb-up', 'assets/thumb-up.png');
    this.load.image('thumb-down', 'assets/thumb-down.png');
  }

  create(): void {
    this.spawnNewItem();
  }

  spawnNewItem(): void {
    const randX = Math.random() * (this.sys.canvas.width - 200) + 100;
    const randY = Math.random() * (this.sys.canvas.height - 200) + 100;

    this.item = this.add
      .image(randX, randY, Math.random() > 0.5 ? 'thumb-up' : 'thumb-down')
      .setScale(0.33);

    this.item.setInteractive();

    this.item.on('pointerdown', () => {
      if (this.item.texture.key === 'thumb-up') {
        this.gameService.incrementScore();
        this.spawnNewItem();
      } else {
        console.log('You clicked on the negative item. Game over!');
        this.scene.stop();
      }
    });

    this.spawnTime = this.time.now;
  }

  override update(): void {
    if (this.time.now - this.spawnTime > this.getItemSpawnTime()) {
      this.spawnNewItem();
    }
  }
  //
  getItemSpawnTime(): number {
    // Decrement the spawn time per 500 points earned, with a minimum of 200 milliseconds
    const decrement = Math.min(this.gameService.getScore() / 500, 800);
    return 1000 - decrement;
  }
}
