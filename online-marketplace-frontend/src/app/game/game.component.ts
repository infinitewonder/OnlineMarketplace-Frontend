import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
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
    this.item = this.add.image(
      Phaser.Math.Between(0, 800),
      Phaser.Math.Between(0, 600),
      Math.random() > 0.5 ? 'thumb-up' : 'thumb-down'
    );

    this.item.setInteractive();

    this.item.on('pointerdown', () => {
      if (this.item.texture.key == 'thumb-up') {
        this.gameService.incrementScore();
      } else {
        // If user clicked on negative item, end the game
        this.gameService.postScore();
        this.scene.stop(); // ends current scene; game over
      }
    });

    this.spawnTime = this.time.now;
  }

  override update(): void {
    if (this.time.now - this.spawnTime > 1000) {
      this.item.x = Phaser.Math.Between(0, 800);
      this.item.y = Phaser.Math.Between(0, 600);
      this.item.setTexture(Math.random() > 0.5 ? 'thumb-up' : 'thumb-down');
      this.spawnTime = this.time.now;
    }
  }
}
