import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserStore } from './store/user.store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://onlinemarketplace-production.up.railway.app/users';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user: any;

  constructor(private userStore: UserStore, private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res) {
          this.userStore.update(res);
          this.loggedIn.next(true);
          this.user = res.user;
        }
      })
    );
  }

  getCurrentUser() {
    return this.user;
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
  }
}
