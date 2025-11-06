import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article, NewsResponse } from '../interfaces/news.interface';
import { environment } from 'src/environments/environment';
import { options } from 'ionicons/icons';
import { catchError, map, Observable, of } from 'rxjs';
import { ArticlesByCategoryAndPage } from '../interfaces/articlesByCategoryAndPage.interface';

const LOCAL_TEST_URL = './assets/a.json';
const NEWS_API_URL = 'https://newsapi.org/v2';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  //! cambiar a la api normal

  private executeQuery<T>(endpoint: string) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${NEWS_API_URL}${endpoint}`, {
      params: {
        apiKey: API_KEY,
        country: 'us',
      },
    });
  }

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

  getTopHeadlinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    if (this.articlesByCategoryAndPage) {
    }
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

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // No existe
      // Lo creamos
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = (this.articlesByCategoryAndPage[category].page += 1);

    return this.http<NewsResponse>();
  }
}
