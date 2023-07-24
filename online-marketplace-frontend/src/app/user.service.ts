import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserStore } from './store/user.store';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private userStore: UserStore, private http: HttpClient) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.loggedIn.next(true);
    }
  }

  login(credentials: any) {
    return this.http.post('/api/login', credentials).pipe(
      tap((user) => {
        this.userStore.update(user);
        this.loggedIn.next(true);
        localStorage.setItem('userToken', 'loggedInUserToken');
      })
    );
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('userToken');
    this.userStore.reset();
  }
}
