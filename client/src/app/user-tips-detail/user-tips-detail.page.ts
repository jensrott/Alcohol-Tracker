import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TipsService } from '../services/tips.service';
import { Tip } from '../models/Tip';
import { Location } from '@angular/common';
import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-tips-detail',
  templateUrl: './user-tips-detail.page.html',
  styleUrls: ['./user-tips-detail.page.scss'],
})
export class UserTipsDetailPage implements OnInit {

  user: User;
  tips: Array<Tip>;
  error: Error;
  id: string = this.route.snapshot.paramMap.get("id");

  constructor(
    private tipsService: TipsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getUserTips();
    if (this.authenticationService.isAuthenticated()) {
      this.getLoggedInUser();
    }
  }

  getUserTips(): void {
    this.tipsService.getTipsUser(this.id).subscribe((tips: any) => {
      this.tips = tips.data;
      console.log(tips.data);
    }),
      (error: Error) => {
        console.log(error)
        this.error = error;
      };
  }

  getLoggedInUser(): void {
    this.authenticationService.getCurrentUser()
      .subscribe(user => {
        console.log(user);
        this.user = user;
      })
  }

  visitDetailPage(id: number): Promise<Boolean> {
    return this.router.navigateByUrl(`/detail/tip/${id}`);
  }

  goBack(): void {
    return this.location.back();
  }

}
