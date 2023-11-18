import { Component, Injectable, inject } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable({
  providedIn: 'root'
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
  password: string = 'Bewerbungen-rola';
  private API_SERVER: string = 'https://innovations.rola.de/build/rola/coolschrank/ongoing/application';
  basicAuthHeader: string = 'Basic ' + btoa(`${this.username}:${this.password}`);
  // headers = new HttpHeaders({
  //   'Authorization': this.basicAuthHeader
  // });
  // httpClient: HttpClient = inject(HttpClient);

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.getFridge('703849d2-4dcf-4e12-8a76-c8f680007e16');

    this.getFridge('703849d2-4dcf-4e12-8a76-c8f680007e16').subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }


  // async getFridge(id: string) {
  //   console.log('getFridge() wurde aufgerufen');
  //   const response = await fetch(`${this.API_SERVER}/fridge/${id}`, {
  //     headers: { 'Authorization': this.basicAuthHeader },
  //     method: 'GET',
  //     mode: 'cors',
  //     // credentials: 'same-origin',
  //   });
  //   console.log(response);
  // }

  getFridge(id: string) {
    const headers = new HttpHeaders({ 'Authorization': this.basicAuthHeader });
    return this.httpClient.get(`${this.API_SERVER}/fridge/${id}`, { headers });
  }

  createFridge() {
    const headers = new HttpHeaders({ Authorization: this.basicAuthHeader });
    this.httpClient.post(`${this.API_SERVER}/fridge`, {}, { headers }).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }


  addItemToFridge(id: string, itemData: any) {
    return this.httpClient.post(`${this.API_SERVER}/fridge/${id}/item`, itemData);
  }

  getItemFromFridge(id: string, itemId: string) {
    return this.httpClient.get(`${this.API_SERVER}/fridge/${id}/item/${itemId}`);
  }





  changeTheme(themeId: string) {
    this.appService.switchTheme(themeId);
  }

}

