import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserStore } from '../store/user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private userStore: UserStore
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Checks if the user is already logged in
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('LOGIN', this.loginForm.value);
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('res');
          console.log(res);
          this.userStore.update((state) => ({ ...state, user: res }));
          this.router.navigate(['']);
        },
        error: (err) => {
          // Handle error here
        },
        complete: () => {
          // Handle completion here
        },
      });
    } else {
      // handle form validation errors
    }
  }
}
