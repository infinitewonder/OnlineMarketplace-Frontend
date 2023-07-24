import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserStore } from './store/user.store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = false;

  constructor(private userStore: UserStore, private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('userToken');
  }

  login(credentials: any) {
    return this.http.post('/api/login', credentials).pipe(
      tap((user) => {
        this.userStore.update(user);
        this.loggedIn = true;
        localStorage.setItem('userToken', 'loggedInUserToken');
      })
    );
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  // Implement logout and possibly a register method here
  logout() {
    this.loggedIn = false;
    localStorage.removeItem('userToken');
    this.userStore.reset(); // Resets the UserStore state
  }
}
