import { Component, inject } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appService: any = inject(AppService);
  title = 'primeNGtest';

  searchText: any;
  themes = [
    {
      id: 'lara-light-blue',
      label: 'Lara Light Blue'
    },
    {
      id: 'bootstrap4-dark-blue',
      label: 'Bootstrap 4 Dark Blue'
    },
    {
      id: 'md-light-deeppurple',
      label: 'Material Light Deeppurple'
    },
  ];

  selectedTheme: { id: string; label: string } = this.themes[0];


  constructor() { }

  changeTheme(themeId: string) {
    this.appService.switchTheme(themeId);
  }

}

