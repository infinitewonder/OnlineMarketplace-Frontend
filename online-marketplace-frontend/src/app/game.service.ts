import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = '/api/game'; // URL to backend

  constructor(private http: HttpClient) {}

  // Implement game related methods, using http.post(), http.get(), etc
}
