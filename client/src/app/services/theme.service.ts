import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const THEME_KEY = "selected-app-theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode: boolean = false

  constructor(
    private platform: Platform,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {

      this.storage.get(THEME_KEY).then(theme => {
        this.setAppTheme(theme);
      })

      const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
      preferDark.addListener(e => {
        console.log(e);
        this.setAppTheme(e.matches)
      })
    })
  }

  toggleAppTheme(): void {
    this.darkMode = !this.darkMode;
    this.setAppTheme(this.darkMode);
  }

  setAppTheme(dark: boolean): void {
    this.darkMode = dark;
    if (this.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    this.storage.set(THEME_KEY, this.darkMode);
  }
}
