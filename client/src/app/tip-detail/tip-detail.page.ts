import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TipsService } from '../services/tips.service'
import { Tip } from '../models/Tip';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';

@Component({
  selector: 'app-tip-detail',
  templateUrl: './tip-detail.page.html',
  styleUrls: ['./tip-detail.page.scss'],
})
export class TipDetailPage implements OnInit {

  user: User;
  tip: Tip;
  error: Error;
  showMsg: Boolean;
  id: string = this.route.snapshot.paramMap.get("id");

  constructor(
    private tipsService: TipsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getTip();
    if (this.authenticationService.isAuthenticated()) {
      this.getLoggedInUser();
    }
  }

  getTip(): void {
    this.tipsService.getTip(this.id).subscribe((tip: any) => {
      this.tip = tip.tip;
      console.log(tip);
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

  visitEditTipPage(id: number): Promise<Boolean> {
    return this.router.navigateByUrl(`/edit/tip/${id}`);
  }

  goBack(): void {
    return this.location.back();
  }
}
