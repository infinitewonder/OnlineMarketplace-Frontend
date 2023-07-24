import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl =
    'https://onlinemarketplace-production.up.railway.app/scores';
  private _score: number = 0;
  private user: any;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user;
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
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.http
          .post(this.baseUrl, { user: user.id, score: this._score })
          .pipe(tap(() => this.resetScore()))
          .subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (err) => console.log(err),
          });
      }
    });
  }

  getScoresByUserId(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  getLeaderboard() {
    return this.http.get<any[]>(`${this.baseUrl}/leaderboard`);
  }
}
