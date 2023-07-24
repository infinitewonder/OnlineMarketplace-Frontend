import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'http://onlinemarketplace-production.up.railway.app/scores';
  private _score: number = 0;

  constructor(private http: HttpClient) {}

  getScore(): number {
    return this._score;
  }

  incrementScore(): void {
    this._score += 1;
  }

  resetScore(): void {
    this._score = 0;
  }

  postScore(user: any): void {
    this.http.post(this.baseUrl, { user: user, score: this._score }).subscribe({
      next: (response) => {
        console.log(response);
        this.resetScore();
      },
      error: (err) => console.log(err),
    });
  }

  getScoresByUserId(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  getLeaderboard() {
    return this.http.get(`${this.baseUrl}/leaderboard`);
  }
}
