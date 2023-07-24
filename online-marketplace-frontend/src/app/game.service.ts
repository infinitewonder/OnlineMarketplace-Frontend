import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserQuery } from './store/user.query';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl =
    'https://onlinemarketplace-production.up.railway.app/scores';
  private _score: number = 0;
  private user: any;

  constructor(private http: HttpClient, private userQuery: UserQuery) {
    this.userQuery
      .select((state) => state.user)
      .subscribe((user) => {
        this.user = user ? user : null;
      });
  }

  getScore(): number {
    return this._score;
  }

  incrementScore(): void {
    this._score += 1;
  }

  resetScore(): void {
    this._score = 0;
  }

  postScore(): void {
    console.log(this.user);
    console.log(this._score);
    if (this.user) {
      const payload = {
        score: this._score,
        user: {
          id: this.user.id,
          username: this.user.username,
          email: this.user.email,
        },
      };

      this.http
        .post(this.baseUrl, payload)
        .pipe(tap(() => this.resetScore()))
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err) => console.log(err),
        });
    }
  }

  getScoresByUserId(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  getLeaderboard() {
    return this.http.get<any[]>(`${this.baseUrl}/leaderboard`);
  }
}
