import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './services/authentication.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  appPages: Array<Object> = [
    {
      title: 'Tips',
      url: '/tabs/tips',
      icon: 'triangle'
    },
    {
      title: 'Calculator',
      url: '/tabs/calculator',
      icon: 'ellipse'
    },
    {
      title: 'About',
      url: '/tabs/about',
      icon: 'square'
    },
  ];

  loggedIn: Boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private storage: Storage,
    private router: Router,
    private authService: AuthenticationService,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(): void {
    this.authService.onLogout();
    this.router.navigateByUrl('/tabs/tips');
  }

  openTutorial(): void {
    this.menu.enable(false);
    this.storage.set('did_tutorial', false);
    this.router.navigateByUrl('/introduction');
  }

  toggleDarkMode(): void {
    this.themeService.toggleAppTheme();
    this.menu.close();
  }
}
