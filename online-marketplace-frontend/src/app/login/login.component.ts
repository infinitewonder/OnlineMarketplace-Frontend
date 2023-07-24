import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed!: boolean;
  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.buildLoginForm();
  }

  private buildLoginForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.next(true);
    this.userService.login(this.loginForm.value).subscribe(
      () => {
        this.loading.next(false);
        this.router.navigate(['']);
      },
      (error) => {
        this.loading.next(false);
        this.snackBar.open(
          'Failed to login. Please check your username or password.',
          '',
          { duration: 4000 }
        );
      }
    );
  }
}
