import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'score'];
  leaderBoardData: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getLeaderBoard();
  }

  getLeaderBoard(): void {
    this.gameService.getLeaderboard().subscribe(
      (leaderboard: any[]) => {
        if (leaderboard) {
          this.leaderBoardData = leaderboard;
          this.leaderBoardData.sort((a, b) => b.score - a.score);
          this.leaderBoardData = this.leaderBoardData.slice(0, 10);
        }
      },
      (error) => {
        console.error('Failed to fetch leaderboard', error);
      }
    );
  }
}
