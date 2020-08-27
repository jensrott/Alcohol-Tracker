import { Component, OnInit } from '@angular/core';
import { TipsService } from '../services/tips.service';
import { Tip } from '../models/Tip';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tips',
  templateUrl: 'tips.page.html',
  styleUrls: ['tips.page.scss']
})
export class TipsPage implements OnInit {

  user: User;
  tips: Array<Tip>;
  error: Error;

  constructor(
    private tipsService: TipsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit(): void {
    this.getTips();
    if (this.authenticationService.isAuthenticated()) {
      this.getLoggedInUser();
    }
  }

  async presentLoading(): Promise<any> {
    const loading = await this.loadingCtrl.create({
      message: 'Getting tips...',
      duration: 1000
    });
    await loading.present();
  }

  presentAlert(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ctrl = this.alertCtrl;
      let alert: Promise<void | HTMLIonAlertElement> = this.alertCtrl.create({
        header: 'Remove tip',
        message: 'Are you sure you want to remove this tip?',
        buttons: [{
          text: 'OK',
          handler: () => {
            ctrl.dismiss().then(() => { resolve(true); });
            return false;
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            ctrl.dismiss().then(() => { resolve(false); });
            return false;
          }
        }]
      }).then((dlg) => dlg.present());
    });
  }

  getTips(): void {
    this.tipsService.getTips()
      .subscribe((tips: any) => {
        if (tips) {
          this.presentLoading();
          this.tips = tips.data;
          console.log(tips.data);
        }
      },
        (error: Error) => {
          console.log(error)
          this.error = error;
        })
  }

  deleteTip(id: string): void {
    this.presentAlert().then((result: boolean) => {
      if (result) {
        this.tipsService.deleteTip(id).subscribe((tip) => {
          console.log(tip);
          this.presentLoading().then((t: any) => {
            this.tips.filter(tip => tip.id != id);
            this.getTips();
          });
        })
      }
    });
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

  visitTipsUserDetailPage(id: number): Promise<Boolean> {
    return this.router.navigateByUrl(`/detail/user/tips/${id}`);
  }

  visitCreatePage(): Promise<Boolean> {
    return this.router.navigateByUrl('/create-tip');
  }
}
