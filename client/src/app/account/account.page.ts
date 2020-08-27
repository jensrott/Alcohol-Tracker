import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User;

  constructor(
    private authService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.authService.getCurrentUser().subscribe(user => {
      console.log(user);
      this.user = user;
    })
  }

  goBack(): void {
    return this.location.back();
  }

}
