import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TipsService } from '../services/tips.service';
import { Tip } from '../models/Tip';
import { User } from '../models/User';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.page.html',
  styleUrls: ['./create-tip.page.scss'],
})
export class CreateTipPage implements OnInit {

  titleErrors: Array<string>;
  descriptionErrors: Array<string>;
  submitted: boolean = false;

  user: User = { // TODO: fix this
    id: null,
    email: "",
    password: "",
    name: "",
    password_confirmation: ""
  };
  tip: Tip = {
    id: "",
    title: "",
    accepted: false,
    description: "",
    user_id: this.user.id, // TODO fix this
  };

  constructor(
    private tipsService: TipsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getLoggedInUser();
  }

  presentAlert(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ctrl = this.alertCtrl;
      let alert: Promise<void | HTMLIonAlertElement> = this.alertCtrl.create({
        header: 'Created tip',
        message: 'Your tip will be looked at and possibly accepted',
        buttons: [{
          text: 'OK',
          handler: () => {
            ctrl.dismiss().then(() => { resolve(true); });
            return false;
          }
        }]
      }).then((dlg) => dlg.present());
    });
  }

  createTip(): void {
    this.tipsService.createTip(this.tip).subscribe((tip: Tip) => {
      if (!tip.errors) {
        this.presentAlert().then((result: boolean) => {
          if (result) {
            this.router.navigateByUrl('/tabs/tips');
          }
        })
      }
      console.log(tip.errors);
      this.titleErrors = tip.errors.title;
      this.descriptionErrors = tip.errors.description;

    }), (error: HttpErrorResponse) => {
      console.log(error);
    }
  }

  getLoggedInUser(): void {
    this.authenticationService.getCurrentUser()
      .subscribe(user => {
        console.log(user);
        this.user = user;
      })
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.createTip();
    }
  }
}
