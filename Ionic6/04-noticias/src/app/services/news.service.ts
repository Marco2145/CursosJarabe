import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article, NewsResponse } from '../interfaces/news.interface';
import { environment } from 'src/environments/environment';
import { options } from 'ionicons/icons';
import { catchError, map, Observable, of } from 'rxjs';

const LOCAL_TEST_URL = './assets/a.json';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?country=us';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);

  //! cambiar a la api normal

  getTopHeadlines(): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(LOCAL_TEST_URL, {
        params: {
          apiKey: API_KEY,
          category: '',
        },
      })
      .pipe(
        map((resp) => resp.articles),
        catchError((error) => {
          console.log('Error en respuesta ', error);
          return of([]);
        })
      );
  }

  getTopHeadlinesByCategory(category: string): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(LOCAL_TEST_URL, {
        params: {
          category: category,
          apiKey: API_KEY,
        },
      })
      .pipe(
        map((resp) => resp.articles),
        catchError((error) => {
          console.log('Error en respuesta ', error);
          return of([]);
        })
      );
  }
}
