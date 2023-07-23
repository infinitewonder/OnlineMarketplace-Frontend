import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private apiUrl = 'http://onlinemarketplace-production.up.railway.app/users';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, user)
      .pipe(tap((tokens) => this.doLoginUser(user.username, tokens)));
  }

  doLoginUser(username: string, tokens: string) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
  }

  logout() {
    this.doLogoutUser();
  }

  doLogoutUser() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
