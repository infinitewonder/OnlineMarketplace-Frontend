import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-marketplace-frontend';

  constructor(public userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
