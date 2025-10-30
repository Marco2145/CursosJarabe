import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MyComponent } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  getUsuarios() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getMenuOptions() {
    return this.http.get<MyComponent[]>('./assets/data/menu-options.json');
  }
}
