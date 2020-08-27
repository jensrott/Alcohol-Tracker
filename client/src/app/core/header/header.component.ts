import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private themeService: ThemeService) {

  }

  ngOnInit() { }

  toggleDarkMode() {
    this.themeService.toggleAppTheme();
  }

}
