import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginOptions } from '../interfaces/login-options';
import { HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted: boolean = false;
  user: LoginOptions = { email: "", password: "" };

  creditErrors: string;
  emailErrors: Array<string>;
  passwordErrors: Array<string>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.creditErrors = "";
  }

  onLogin(form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      this.authService.onLogin(this.user.email, this.user.password)
        .subscribe(user => {
          if (!user.errors) {
            localStorage.setItem('jwtToken', user.access_token);
            this.router.navigateByUrl('/');
          }

          console.log(user);

          this.emailErrors = user.errors.email;
          this.passwordErrors = user.errors.password;

        }, (error: HttpErrorResponse) => {
          this.creditErrors = error.error.credits;
        })
    }
  }

  visitRegisterPage(): Promise<Boolean> {
    return this.router.navigateByUrl('/register');
  }

}
