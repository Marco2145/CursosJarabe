import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article, NewsResponse } from '../interfaces/news.interface';
import { environment } from 'src/environments/environment';
import { options } from 'ionicons/icons';
import { catchError, map, Observable, of } from 'rxjs';
import { ArticlesByCategoryAndPage } from '../interfaces/articlesByCategoryAndPage.interface';

const LOCAL_TEST_URL = './assets/a.json';
const NEWS_API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  getTopHeadlines(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');

    // const url = `${NEWS_API_URL}/top-headlines`;

    // return this.http
    //   .get<NewsResponse>(LOCAL_TEST_URL, {
    //     params: {
    //       apiKey: API_KEY,
    //       category: '',
    //       country: 'us',
    //     },
    //   })
    //   .pipe(
    //     map((resp) => resp.articles),
    //     catchError((error) => {
    //       console.log('Error en respuesta ', error);
    //       return of([]);
    //     })
    //   );
  }

  getTopHeadlinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    if (loadMore) {
      return this._getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this._getArticlesByCategory(category);
  }

  // Funcion privada para conseguir articulos por categoria y guardarlos en cache
  //! cambiar url a la de la api normal
  private _getArticlesByCategory(category: string): Observable<Article[]> {
    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // No existe
      // Lo creamos
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;
    // const url = `${NEWS_API_URL}/top-headlines`;
    const url = `${LOCAL_TEST_URL}`;

    return this.http
      .get<NewsResponse>(url, {
        params: {
          apiKey: API_KEY,
          category: category,
          page: page,
          country: 'us',
        },
      })
      .pipe(
        map((response) => {
          if (response.articles.length === 0)
            return this.articlesByCategoryAndPage[category].articles;

          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [
              ...this.articlesByCategoryAndPage[category].articles,
              ...response.articles,
            ],
          };

          return this.articlesByCategoryAndPage[category].articles;
        }),
        catchError((error) => {
          console.log('Error en respuesta de api ', error);
          return of([]);
        })
      );
  }
}
