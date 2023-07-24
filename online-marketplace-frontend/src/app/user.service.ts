import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserStore, UserState, User } from './store/user.store';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://onlinemarketplace-production.up.railway.app/users';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private userStore: UserStore,
    private gameService: GameService,
    private http: HttpClient
  ) {}

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        console.log(res);
        if (res) {
          this.userStore.update({ user: res.user });
          this.loggedIn.next(true);
          this.gameService.resetScore();
        }
      })
    );
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteUser(id: number) {
    this.userStore.update({});
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateUser(user: User) {
    this.userStore.update({ user });
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
    this.userStore.reset();
  }
}
