import { Component, inject } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

username: string = 'rolabewerbung';
password: string = 'Bewerbung-rola';
url: string = 'https://innovations.rola.com/build/rola/coolschrank/ongoing/documentation';
basicAuthHeader: string = 'Basic ' + btoa(`${this.username}:${this.password}`);
headers = new HttpHeaders({
  'Authorization': this.basicAuthHeader
});


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.testURL();
  }

  async testURL() {
    console.log('testURL() wurde aufgerufen');

    try {
      console.log('Vor fetch');
      const response = await fetch(this.url, {
        headers: { 'Authorization': this.basicAuthHeader },
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });
      console.log('Nach fetch');
      console.log('Response status:', response.status, response.statusText);
      const data = await response.json(); // or response.json() if the response is JSON
      console.log('Die URL funktioniert!', data);
    } catch (error) {
      console.error('Fehler beim Abrufen der URL:', error);
    }
  }

  changeTheme(themeId: string) {
    this.appService.switchTheme(themeId);
  }

}

