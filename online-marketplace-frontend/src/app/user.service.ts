import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserStore } from './store/user.store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://onlinemarketplace-production.up.railway.app/users';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user: any;
  private userSubject: Subject<any> = new Subject<any>();

  constructor(private userStore: UserStore, private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        console.log('Login response:', res);
        if (res) {
          this.userStore.update(res);
          this.loggedIn.next(true);
          this.user = res.user;
          this.userSubject.next(this.user);
        }
      })
    );
  }

  getLoggedInUser(): Observable<any> {
    return this.userSubject.asObservable();
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
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateUser(user: any) {
    return this.http.put(`${this.baseUrl}`, user);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
    this.userStore.reset();
    this.user = null;
    this.userSubject.next(this.user);
  }
}
