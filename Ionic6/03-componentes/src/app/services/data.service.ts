import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MyComponent } from '../interfaces/interfaces';
import { Album } from '../interfaces/Album';
import { Hero } from '../interfaces/Heroes';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  getUsuarios() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getAlbumes() {
    return this.http.get<Album[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }

  getMenuOptions() {
    return this.http.get<MyComponent[]>('./assets/data/menu-options.json');
  }

  getHeroes() {
    return this.http
      .get<Hero[]>('./assets/data/superheroes.json')
      .pipe(delay(1500));
  }
}
