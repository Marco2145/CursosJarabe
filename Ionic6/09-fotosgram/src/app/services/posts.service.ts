import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostsResponse } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _http = inject(HttpClient);

  postsPage = 0;

  getPosts(reset: boolean = false) {
    if (reset) this.postsPage = 0;

    this.postsPage++;
    return this._http.get<PostsResponse>(
      `${URL}/posts/?page=${this.postsPage}`
    );
  }
}
