import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterOptions } from '../interfaces/register-options';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  submitted: boolean = false;
  user: RegisterOptions = { name: '', email: '', password: '', password_confirmation: '' };
  samePasswordMsg: string;

  nameErrors: Array<string>;
  emailErrors: Array<string>;
  passwordErrors: Array<string>;
  passwordConfirmationErrors: Array<string>;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  onRegister(form: NgForm): void {
    this.submitted = true;
    if (this.user.password !== this.user.password_confirmation) {
      let errorMsg = "Passwords are not the same!";
      this.samePasswordMsg = errorMsg;
    }
    if (form.valid && this.user.password === this.user.password_confirmation) {
      this.samePasswordMsg = "";
      this.authService.onRegister(
        this.user.name,
        this.user.email,
        this.user.password,
        this.user.password_confirmation
      ).subscribe(user => {
        console.log(user);
        if (!user.errors) {
          this.router.navigateByUrl('/login');
        }
        console.log(user.errors);
        this.nameErrors = user.errors.name;
        this.emailErrors = user.errors.email;
        this.passwordErrors = user.errors.password;
        this.passwordConfirmationErrors = user.errors.password_confirmation;

      }, (error: HttpErrorResponse) => {
        console.log(error);
      })
    }
  }

  visitLoginPage(): Promise<Boolean> {
    return this.router.navigateByUrl('/login');
  }

}
