import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '../store/user.store';
import { UserQuery } from '../store/user.query';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private userQuery: UserQuery
  ) {
    this.userQuery.select().subscribe((userState) => {
      this.user = userState.user
        ? userState.user
        : { id: 0, username: '', email: '' };
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this.user) {
      this.profileForm = this.fb.group({
        username: [this.user.username, Validators.required],
        email: [this.user.email, Validators.email],
      });
    }
  }

  onDelete() {
    this.userService.deleteUser(this.user!.id).subscribe({
      next: (data) => {
        this.userService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  onUpdate() {
    if (this.profileForm.valid) {
      this.userService
        .updateUser(this.profileForm.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            console.log('Error:', error);
          },
        });
    }
  }
}
