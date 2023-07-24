import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class GameService {
  private url = '/api/game';
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

  postScore(): void {
    this.http.post(this.url, { score: this._score }).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
    this.resetScore();
  }
}
